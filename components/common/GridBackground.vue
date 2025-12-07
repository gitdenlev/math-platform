<template>
  <div
    class="relative min-h-screen w-full flex flex-col bg-[#fafaf9] dark:bg-gray-950 overflow-hidden transition-colors duration-300"
  >
    <!-- Static Grid Pattern -->
    <div
      class="absolute inset-0 z-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:60px_60px]"
    ></div>

    <!-- Animated Beams Container -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        v-for="beam in beams"
        :key="beam.id"
        class="absolute"
        :style="beam.style"
      >
        <!-- Horizontal Beam Structure -->
        <template v-if="beam.direction === 'horizontal'">
          <div
            class="w-full h-full bg-gradient-to-r from-transparent via-emerald-400 dark:via-emerald-600 to-transparent opacity-0 animate-beam-h"
            :style="{ animationDuration: beam.duration + 'ms' }"
          ></div>
          <div
            class="absolute right-0 top-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full bg-emerald-600 dark:bg-emerald-400 shadow-[0_0_8px_2px_rgba(16,185,129,0.4)] animate-dot-h opacity-0"
            :style="{ animationDuration: beam.duration + 'ms' }"
          ></div>
        </template>

        <!-- Vertical Beam Structure -->
        <template v-else>
          <div
            class="w-full h-full bg-gradient-to-b from-transparent via-emerald-400 dark:via-emerald-600 to-transparent opacity-0 animate-beam-v"
            :style="{ animationDuration: beam.duration + 'ms' }"
          ></div>
          <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-emerald-600 dark:bg-emerald-400 shadow-[0_0_8px_2px_rgba(16,185,129,0.4)] animate-dot-v opacity-0"
            :style="{ animationDuration: beam.duration + 'ms' }"
          ></div>
        </template>
      </div>
    </div>

    <!-- Content Slot -->
    <div
      class="relative z-10 w-full h-full flex flex-col flex-1"
      :class="innerClass"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

defineProps({
  innerClass: {
    type: String,
    default: "",
  },
});

const beams = ref([]);
let beamIdCounter = 0;
let intervalId = null;

const SPAWN_RATE_MS = 400; // How often to spawn a new beam
const GRID_SIZE = 60;

const spawnBeam = () => {
  // Clean up old beams
  const now = Date.now();
  beams.value = beams.value.filter((b) => now - b.createdAt < b.duration);

  // Determine direction (50/50 horizontal or vertical)
  const isHorizontal = Math.random() > 0.5;
  const duration = 2000 + Math.random() * 2000; // 2s - 4s duration

  // Window dimensions (approximate is fine for spawning coordinates)
  // We want to snap to grid lines.
  const maxWidth = typeof window !== "undefined" ? window.innerWidth : 1000;
  const maxHeight = typeof window !== "undefined" ? window.innerHeight : 1000;

  // Calculate position aligned to grid
  // We offset by 1px to align with the 1px grid lines approximately
  let style = {};

  if (isHorizontal) {
    // Random row
    const maxRows = Math.floor(maxHeight / GRID_SIZE);
    const row = Math.floor(Math.random() * maxRows);
    style = {
      top: `${row * GRID_SIZE}px`,
      left: "-200px", // Start off-screen
      width: "200px", // Length of the tail
      height: "1px",
    };
  } else {
    // Random col
    const maxCols = Math.floor(maxWidth / GRID_SIZE);
    const col = Math.floor(Math.random() * maxCols);
    style = {
      left: `${col * GRID_SIZE}px`,
      top: "-200px", // Start off-screen vertical
      width: "1px",
      height: "200px", // Length of the tail
    };
  }

  beams.value.push({
    id: beamIdCounter++,
    createdAt: now,
    direction: isHorizontal ? "horizontal" : "vertical",
    duration: duration,
    style: style,
  });
};

onMounted(() => {
  spawnBeam(); // one immediately
  intervalId = setInterval(spawnBeam, SPAWN_RATE_MS);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
/* Keyframes for sliding animation */
/* We animate a wrapper or the inner elements to move across the screen */

/* However, creating dynamic @keyframes in scoped CSS for random distances is hard.
   Instead, we can just assume screen width is large enough, or use a huge translation.
   For simplicity, let's translate by 100vw/100vh + offset.
*/

@keyframes beam-slide-h {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(calc(100vw + 400px));
    opacity: 0;
  }
}

@keyframes beam-slide-v {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(100vh + 400px));
    opacity: 0;
  }
}

.animate-beam-h {
  animation-name: beam-slide-h;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.animate-dot-h {
  animation-name: beam-slide-h;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.animate-beam-v {
  animation-name: beam-slide-v;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.animate-dot-v {
  animation-name: beam-slide-v;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>
