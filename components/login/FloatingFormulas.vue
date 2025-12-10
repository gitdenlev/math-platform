<template>
  <div
    class="absolute inset-0 overflow-hidden bg-gray-50/50 dark:bg-gray-900/50 perspective-1000"
    ref="containerRef"
  >
    <!-- Background Gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-emerald-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/30"
    ></div>

    <div
      v-for="particle in particles"
      :key="particle.id"
      class="absolute whitespace-nowrap font-serif transition-colors duration-700 ease-linear select-none will-change-transform"
      :class="[
        particle.isHighlighted
          ? 'text-emerald-600 dark:text-emerald-400 z-10'
          : 'text-gray-300 dark:text-gray-700 z-0',
      ]"
      :style="{
        transform: `translate3d(${particle.x}px, ${particle.y}px, ${particle.z}px) rotate(${particle.rotation}deg)`,
        opacity: particle.opacity,
        fontSize: `${particle.size}px`,
        filter: `blur(${particle.blur}px)`,
      }"
    >
      {{ particle.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { MATH_FORMULAS } from "~/constants/mathFormulas";

const containerRef = ref<HTMLElement | null>(null);
const particles = ref<any[]>([]);
let animationFrameId: number | null = null;
let width = 1000;
let height = 1000;

const PARTICLE_COUNT = 25;

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const createParticle = (id: number, isInitial = false) => {
  const size = random(14, 32);
  // Deeper z means smaller visual size + more blur
  const z = random(-100, 50);
  const blur = Math.max(0, (Math.abs(z) / 100) * 2);

  return {
    id,
    text: MATH_FORMULAS[Math.floor(Math.random() * MATH_FORMULAS.length)],
    x: random(0, width),
    y: isInitial ? random(0, height) : height + 50, // Start from bottom if new
    z,
    rotation: random(-15, 15),
    size,
    opacity: random(0.2, 0.6),
    speedY: random(0.2, 0.8), // Floating up
    speedX: random(-0.2, 0.2), // Slight drift
    rotationSpeed: random(-0.05, 0.05),
    isHighlighted: false,
    blur,
  };
};

const updateParticles = () => {
  particles.value.forEach((p) => {
    p.y -= p.speedY; // Float up
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;

    // Reset loop
    if (p.y < -100) {
      Object.assign(p, createParticle(p.id));
      p.y = height + 50; // Reset to bottom
    }
  });

  animationFrameId = requestAnimationFrame(updateParticles);
};

// Periodic highlighting
let intervalId: any = null;

onMounted(() => {
  if (typeof window !== "undefined") {
    width = window.innerWidth * 0.55; // Approx width of the container
    height = window.innerHeight;

    // Resize listener
    window.addEventListener("resize", () => {
      width = window.innerWidth * 0.55;
      height = window.innerHeight;
    });
  }

  // Init particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.value.push(createParticle(i, true));
  }

  updateParticles();

  // Randomly highlight a formula occasionally
  intervalId = setInterval(() => {
    const idx = Math.floor(Math.random() * particles.value.length);
    particles.value.forEach((p) => (p.isHighlighted = false));
    if (particles.value[idx]) {
      particles.value[idx].isHighlighted = true;
      // Reset highlight after some time
      setTimeout(() => {
        if (particles.value[idx]) particles.value[idx].isHighlighted = false;
      }, 2000);
    }
  }, 3000);
});

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>
