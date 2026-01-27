import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { evaluate } from "mathjs";

export type ExpressionType =
  | "equation"
  | "units"
  | "function"
  | "constant"
  | "formula"
  | "unknown";

export type SpaceHealth = "Strong" | "Needs Attention" | "Weak";

export interface MistakePattern {
  id: string;
  category: string;
  count: number;
  description: string;
  examples: string[];
}

export interface SpaceRecommendation {
  action: string;
  reason: string;
  priority: "High" | "Medium" | "Low";
}

export interface Expression {
  id: string;
  content: string;
  result: string;
  type: ExpressionType;
  isLoading?: boolean;
  createdAt: string;
  // Pro Fields
  isError?: boolean;
  errorCategory?: string;
  solveTimeMs?: number;
  isPinned?: boolean;
}

export interface SpaceLog {
  id: string;
  action: string;
  details?: string;
  timestamp: string;
}

export interface Space {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  expressions: Expression[];
  logs: SpaceLog[];
  // Pro Fields
  health: SpaceHealth;
  mistakePatterns: MistakePattern[];
  recommendation?: SpaceRecommendation;
  isPinned?: boolean;
}

export const useSpacesStore = defineStore("spaces", () => {
  // --- State ---
  const spaces = ref<Space[]>([]);

  // --- Persistence ---
  const isLoaded = ref(false);

  function saveToStorage() {
    if (import.meta.client) {
      localStorage.setItem("humanify-spaces", JSON.stringify(spaces.value));
    }
  }

  function loadFromStorage() {
    if (import.meta.client) {
      const saved = localStorage.getItem("humanify-spaces");
      if (saved) {
        try {
          spaces.value = JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved spaces", e);
        }
      } else {
        // Initial defaults
        spaces.value = [
          {
            id: "1",
            title: "Algebra 101",
            description: "Basic algebra problems and formulas",
            createdAt: new Date().toISOString(),
            expressions: [],
            logs: [],
            health: "Strong",
            mistakePatterns: [],
          },
        ];
        saveToStorage();
      }
      isLoaded.value = true;
    } else {
      isLoaded.value = true; // On server, mark as loaded (empty) to avoid permanent loading state
    }
  }

  // Don't auto-initialize on server - will be done by client plugin

  // --- Getters ---
  const getSpaceById = (id: string) => spaces.value.find((s) => s.id === id);

  // --- Helpers ---
  function detectExpressionType(content: string): ExpressionType {
    const lowerContent = content.toLowerCase().trim();

    // Check for unit conversions (e.g., "1m to km", "100 kg in lb")
    if (/\d+\s*[a-z]+\s+(to|in)\s+[a-z]+/i.test(lowerContent)) {
      return "units";
    }

    // Check for constants (pi, e, etc.)
    if (/^(pi|e|phi|tau|inf|infinity)$/i.test(lowerContent)) {
      return "constant";
    }

    // Check for functions (sin, cos, sqrt, log, etc.)
    if (
      /^(sin|cos|tan|sqrt|log|ln|exp|abs|ceil|floor|round|pow|min|max)\s*\(/i.test(
        lowerContent,
      )
    ) {
      return "function";
    }

    // Check for equations (contains = with variables)
    if (
      /[a-z]\s*[+\-*/^]\s*\d|=/.test(lowerContent) &&
      /[a-z]/i.test(lowerContent)
    ) {
      return "equation";
    }

    // Check for formulas (complex expressions with variables)
    if (/[a-z]\s*[+\-*/^()]/i.test(lowerContent)) {
      return "formula";
    }

    // Simple arithmetic
    if (/^[\d\s\+\-\*\/\(\)\.%]+$/.test(lowerContent)) {
      return "equation";
    }

    return "unknown";
  }

  function addLog(spaceId: string, action: string, details?: string) {
    const space = getSpaceById(spaceId);
    if (space) {
      if (!space.logs) space.logs = [];
      space.logs.unshift({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        action,
        details,
        timestamp: new Date().toISOString(),
      });
      // Keep logs limited to say 50 items
      if (space.logs.length > 50) {
        space.logs = space.logs.slice(0, 50);
      }
      saveToStorage();
    }
  }

  function recalculateHealth(space: Space) {
    if (space.expressions.length === 0) {
      space.health = "Strong"; // Default
      return;
    }

    // Simple heuristic: Error rate
    const total = space.expressions.length;
    const errors = space.expressions.filter((e) => e.isError).length;
    const errorRate = errors / total;

    if (errorRate > 0.3) {
      space.health = "Weak";
    } else if (errorRate > 0.1) {
      space.health = "Needs Attention";
    } else {
      space.health = "Strong";
    }
  }

  // --- Actions ---
  function addSpace(title: string, description: string) {
    // Generate a complex ID without problematic URL chars like #
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@";
    let id = "";
    for (let i = 0; i < 16; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const newSpace: Space = {
      id,
      title,
      description,
      createdAt: new Date().toISOString(),
      expressions: [],
      logs: [],
      health: "Strong",
      mistakePatterns: [],
      isPinned: false,
    };
    spaces.value.push(newSpace);
    saveToStorage();
    return id;
  }

  function removeSpace(id: string) {
    spaces.value = spaces.value.filter((s) => s.id !== id);
    saveToStorage();
  }

  function addExpression(spaceId: string, content: string) {
    const space = getSpaceById(spaceId);
    if (!space) return;

    const exprType = detectExpressionType(content);
    const exprId = Date.now().toString();

    // Add expression with loading state
    const newExpr: Expression = {
      id: exprId,
      content,
      result: "",
      type: exprType,
      isLoading: true,
      createdAt: new Date().toISOString(),
    };
    space.expressions.push(newExpr);
    addLog(spaceId, "Added calculation", content);
    saveToStorage();

    // Evaluate using mathjs
    setTimeout(() => {
      const expr = space.expressions.find((e) => e.id === exprId);
      if (expr) {
        let result = "Error";
        let isError = false;
        try {
          // Use mathjs evaluate
          const evaluated = evaluate(content);

          // Format result based on type
          if (typeof evaluated === "number") {
            // Precision handling could be improved here
            result = parseFloat(evaluated.toPrecision(14)).toString();
          } else if (evaluated && evaluated.toString) {
            result = evaluated.toString();
          } else {
            result = String(evaluated);
          }
        } catch (e) {
          result = "Error";
          isError = true;
        }
        expr.result = result;
        expr.isError = isError;
        expr.isLoading = false;

        // Recalculate Health
        recalculateHealth(space);
        saveToStorage();
      }
    }, 300);
  }

  function updateExpression(spaceId: string, exprId: string, content: string) {
    const space = getSpaceById(spaceId);
    if (space) {
      const expr = space.expressions.find((e) => e.id === exprId);
      if (expr) {
        const oldContent = expr.content;
        expr.content = content;
        expr.type = detectExpressionType(content);
        expr.isLoading = true;

        addLog(spaceId, "Updated calculation", `${oldContent} -> ${content}`);

        // Re-calculate
        setTimeout(() => {
          let result = "Error";
          let isError = false;
          try {
            const evaluated = evaluate(content);
            if (typeof evaluated === "number") {
              result = parseFloat(evaluated.toPrecision(14)).toString();
            } else if (evaluated && evaluated.toString) {
              result = evaluated.toString();
            } else {
              result = String(evaluated);
            }
          } catch {
            result = "Error";
            isError = true;
          }
          expr.result = result;
          expr.isError = isError;
          expr.isLoading = false;

          recalculateHealth(space);
        }, 300);
      }
    }
  }

  function removeExpression(spaceId: string, exprId: string) {
    const space = getSpaceById(spaceId);
    if (space) {
      const expr = space.expressions.find((e) => e.id === exprId);
      const content = expr?.content || "Unknown";
      space.expressions = space.expressions.filter((e) => e.id !== exprId);
      addLog(spaceId, "Removed calculation", content);
    }
  }

  function importExpression(targetSpaceId: string, expression: Expression) {
    const space = getSpaceById(targetSpaceId);
    if (space) {
      // Create a copy with a new ID
      const newExpr: Expression = {
        ...expression,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      space.expressions.push(newExpr);
      addLog(targetSpaceId, "Imported calculation", expression.content);
    }
  }

  function renameSpace(id: string, newTitle: string) {
    const space = getSpaceById(id);
    if (space) {
      const oldTitle = space.title;
      space.title = newTitle;
      addLog(id, "Renamed space", `${oldTitle} -> ${newTitle}`);
    }
  }

  function togglePinExpression(spaceId: string, exprId: string) {
    const space = getSpaceById(spaceId);
    if (space) {
      const expr = space.expressions.find((e) => e.id === exprId);
      if (expr) {
        expr.isPinned = !expr.isPinned;
        saveToStorage();
      }
    }
  }

  function togglePinSpace(id: string) {
    const space = getSpaceById(id);
    if (space) {
      space.isPinned = !space.isPinned;
      saveToStorage();
    }
  }

  return {
    spaces,
    isLoaded,
    loadFromStorage,
    getSpaceById,
    addSpace,
    removeSpace,
    renameSpace,
    addExpression,
    updateExpression, // Export this
    removeExpression,
    importExpression,
    togglePinExpression,
    togglePinSpace,
  };
});
