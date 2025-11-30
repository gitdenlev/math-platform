export const formulas = [
  // Алгебра (найважливіше)
  { name: "Quadratic Formula (+)", value: "(-b + sqrt(b^2 - 4*a*c)) / (2*a)" },
  { name: "Quadratic Formula (-)", value: "(-b - sqrt(b^2 - 4*a*c)) / (2*a)" },
  { name: "Power", value: "x^n" },
  { name: "Square Root", value: "sqrt(x)" },
  { name: "N-th Root", value: "root(x, n)" },

  // Аналітична Геометрія (9-10 клас)
  { name: "Distance Between Points", value: "sqrt((x2-x1)^2 + (y2-y1)^2)" },
  { name: "Midpoint", value: "((x1+x2)/2, (y1+y2)/2)" },
  { name: "Slope (m)", value: "(y2-y1)/(x2-x1)" },
  { name: "Line Eq (Point-Slope)", value: "y - y1 = m*(x - x1)" },

  // Геометрія (Фігури)
  { name: "Pythagorean Theorem", value: "sqrt(a^2 + b^2)" },
  { name: "Circle Area", value: "pi * r^2" },
  { name: "Triangle Area", value: "(base * height) / 2" },
  { name: "Sphere Volume", value: "(4/3) * pi * r^3" },
  { name: "Trapezoid Area", value: "((a + b) / 2) * h" },

  // Теореми Трикутників
  { name: "Law of Sines", value: "a/sin(A) = b/sin(B)" },
  { name: "Law of Cosines", value: "c^2 = a^2 + b^2 - 2*a*b*cos(C)" },

  // Прогресії
  { name: "Arithmetic Sum", value: "(n/2) * (2*a1 + (n-1)*d)" },
  { name: "Geometric Sum", value: "a1 * (1 - r^n) / (1 - r)" },

  // Тригонометрія
  { name: "Sine", value: "sin(x)" },
  { name: "Cosine", value: "cos(x)" },
  { name: "Tangent", value: "tan(x)" },

  // Логарифми
  { name: "Natural Log (ln)", value: "ln(x)" },
  { name: "Logarithm (base 10)", value: "log(x)" },
  { name: "Logarithm (base b)", value: "log(x, b)" },
  { name: "Exponential", value: "e^x" },

  // Практичні
  { name: "Factorial", value: "n!" },
  { name: "Absolute Value", value: "|x|" },
  { name: "Percentage", value: "(part / whole) * 100" },
];

export const functionCategories = [
  {
    name: "Trigonometry",
    icon: "ph:triangle",
    items: [
      { name: "sin", value: "sin(" },
      { name: "cos", value: "cos(" },
      { name: "tan", value: "tan(" },
      { name: "sinh", value: "sinh(" },
      { name: "cosh", value: "cosh(" },
      { name: "tanh", value: "tanh(" },
      { name: "asin", value: "asin(" },
      { name: "acos", value: "acos(" },
      { name: "atan", value: "atan(" },
    ],
  },
  {
    name: "Combinatorics",
    icon: "ph:tree-structure",
    items: [
      { name: "nCr (Comb)", value: "nCr(" },
      { name: "nPr (Perm)", value: "nPr(" },
      { name: "factorial", value: "fact(" },
      { name: "binomial", value: "binom(" },
    ],
  },
  {
    name: "Vectors & Matrices",
    icon: "ph:matrix",
    items: [
      { name: "dot product", value: "dot(" },
      { name: "cross product", value: "cross(" },
      { name: "determinant", value: "det(" },
      { name: "inverse", value: "inv(" },
      { name: "transpose", value: "trans(" },
    ],
  },
  {
    name: "Complex Numbers",
    icon: "ph:infinity",
    items: [
      { name: "imaginary (i)", value: "i" },
      { name: "magnitude", value: "abs(" },
      { name: "phase/arg", value: "arg(" },
      { name: "conjugate", value: "conj(" },
      { name: "real part", value: "re(" },
      { name: "imag part", value: "im(" },
    ],
  },
  {
    name: "Algebra",
    icon: "ph:function",
    items: [
      { name: "ln", value: "ln(" },
      { name: "log", value: "log(" },
      { name: "abs", value: "abs(" },
      { name: "factor", value: "factor(" },
      { name: "expand", value: "expand(" },
      { name: "simplify", value: "simplify(" },
      { name: "solve", value: "solve(" },
    ],
  },
  {
    name: "Calculus",
    icon: "ph:graph",
    items: [
      { name: "derivative", value: "derivative(" },
      { name: "integral", value: "integral(" },
      { name: "limit", value: "limit(" },
    ],
  },
  {
    name: "Statistics",
    icon: "ph:chart-bar",
    items: [
      { name: "mean", value: "mean(" },
      { name: "median", value: "median(" },
      { name: "mode", value: "mode(" },
      { name: "std", value: "std(" },
    ],
  },
];

export const formatOptions = [
  { label: "Decimal", value: "decimal" },
  { label: "Scientific", value: "scientific" },
  { label: "Fraction", value: "fraction" },
  { label: "Percentage", value: "percentage" },
  { label: "Binary", value: "binary" },
  { label: "Hex", value: "hex" },
];

export const precisionOptions = [
  { label: "2 decimals", value: 2 },
  { label: "4 decimals", value: 4 },
  { label: "6 decimals", value: 6 },
  { label: "Full precision", value: "full" },
];

export const unitCategories = [
  {
    name: "Length",
    icon: "ph:ruler",
    items: [
      { name: "m → km", value: "1 m to km" },
      { name: "m → cm", value: "1 m to cm" },
      { name: "m → mm", value: "1 m to mm" },
      { name: "km → miles", value: "1 km to miles" },
      { name: "feet → m", value: "1 feet to m" },
      { name: "inches → cm", value: "1 inch to cm" },
    ],
  },
  {
    name: "Weight",
    icon: "ph:scales",
    items: [
      { name: "kg → g", value: "1 kg to g" },
      { name: "kg → lb", value: "1 kg to lb" },
      { name: "lb → kg", value: "1 lb to kg" },
      { name: "oz → g", value: "1 oz to g" },
    ],
  },
  {
    name: "Temperature",
    icon: "ph:thermometer",
    items: [
      { name: "°C → °F", value: "20 degC to degF" },
      { name: "°F → °C", value: "68 degF to degC" },
      { name: "°C → K", value: "20 degC to K" },
    ],
  },
  {
    name: "Area",
    icon: "ph:square",
    items: [
      { name: "m² → km²", value: "1 m^2 to km^2" },
      { name: "m² → ft²", value: "1 m^2 to ft^2" },
    ],
  },
  {
    name: "Volume",
    icon: "ph:cube",
    items: [
      { name: "L → mL", value: "1 L to mL" },
      { name: "L → gal", value: "1 L to gal" },
      { name: "L → cups", value: "1 L to cups" },
    ],
  },
];

export const constants = [
  { name: "Pi (π)", symbol: "π", value: "pi" },
  { name: "Euler's number (e)", symbol: "e", value: "e" },
  { name: "Golden Ratio (φ)", symbol: "φ", value: "phi" },
  { name: "Speed of Light (c)", symbol: "c", value: "299792458 m/s" },
  { name: "Gravity (g)", symbol: "g", value: "9.81 m/s^2" },
  { name: "Avogadro (NA)", symbol: "NA", value: "6.022e23" },
];