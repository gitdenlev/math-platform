<template>
  <div
    class="relative min-h-screen bg-[#030f1e] overflow-hidden font-sans text-white selection:bg-emerald-500/30"
  >
    <!-- Canvas Background -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full pointer-events-none"
    />

    <!-- Grid Background Overlay (Left Side Only) -->
    <div
      class="absolute inset-y-0 left-0 w-full lg:w-[55%] bg-[#030f1e]/90 backdrop-blur-[1px] border-r border-white/5 z-0"
    >
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"
      ></div>
      <!-- Vignette for smooth transition -->
      <div
        class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030f1e] to-transparent"
      ></div>
    </div>

    <div class="relative z-10 min-h-screen flex items-center">
      <div class="w-full max-w-md px-8 py-12 ml-4 sm:ml-12 lg:ml-24">
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-12">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/20"
          >
            <Icon name="ph:plant-fill" class="w-6 h-6 text-white" />
          </div>
          <span class="text-white text-2xl font-bold tracking-tight"
            >Humanify</span
          >
        </div>

        <!-- Form Container -->
        <div>
          <h1 class="text-4xl font-bold text-white mb-3 tracking-tight">
            {{ isLogin ? "Welcome Back" : "Join Humanify" }}
          </h1>
          <p class="text-gray-400 mb-8 text-sm leading-relaxed">
            {{
              isLogin
                ? "Step into the world of mathematical computing and decentralized learning."
                : "Create an account to start your journey."
            }}
          </p>

          <!-- Google Button -->
          <button
            class="w-full bg-[#0a1929] hover:bg-[#0f2339] text-white py-3.5 px-4 rounded-xl border border-gray-800 flex items-center justify-center gap-3 mb-6 transition-all duration-200 group hover:border-emerald-500/30"
          >
            <Icon
              name="ph:google-logo-bold"
              class="w-5 h-5 text-white group-hover:text-emerald-400 transition-colors"
            />
            <span class="font-medium">Continue with Google</span>
          </button>

          <div class="relative mb-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-800"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-[#030f1e] text-gray-500 font-medium"
                >or {{ isLogin ? "sign in" : "sign up" }} with email</span
              >
            </div>
          </div>

          <form @submit.prevent class="space-y-5">
            <!-- Email Input -->
            <div>
              <label class="block text-gray-400 text-xs font-medium mb-2 ml-1"
                >Email Address</label
              >
              <input
                v-model="form.email"
                type="email"
                placeholder="name@example.com"
                class="w-full bg-[#0a1929]/50 border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
              />
            </div>

            <!-- Password Input -->
            <div>
              <label class="block text-gray-400 text-xs font-medium mb-2 ml-1"
                >Password</label
              >
              <input
                v-model="form.password"
                type="password"
                placeholder="••••••••"
                class="w-full bg-[#0a1929]/50 border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
              />
            </div>

            <!-- Confirm Password (Sign Up only) -->
            <div
              v-if="!isLogin"
              class="animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <label class="block text-gray-400 text-xs font-medium mb-2 ml-1"
                >Confirm Password</label
              >
              <input
                v-model="form.confirmPassword"
                type="password"
                placeholder="••••••••"
                class="w-full bg-[#0a1929]/50 border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
              />
            </div>

            <!-- Remember & Forgot -->
            <div v-if="isLogin" class="flex items-center justify-between mb-2">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  class="w-4 h-4 rounded border-gray-700 bg-transparent text-emerald-600 focus:ring-emerald-600 focus:ring-offset-0 cursor-pointer"
                />
                <span
                  class="text-gray-400 text-xs group-hover:text-gray-300 transition-colors"
                  >Remember me</span
                >
              </label>
              <a
                href="#"
                class="text-emerald-500 text-xs hover:text-emerald-400 transition-colors font-medium"
              >
                Forgot password?
              </a>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-emerald-900/20 transform active:scale-[0.98] transition-all duration-200"
            >
              {{ isLogin ? "Sign In" : "Create Account" }}
            </button>
          </form>

          <!-- Toggle Mode -->
          <p class="text-gray-400 text-sm mt-8">
            {{ isLogin ? "Not registered yet?" : "Already have an account?" }}
            <button
              @click="toggleMode"
              class="text-emerald-500 hover:text-emerald-400 font-medium ml-1 transition-colors hover:underline"
            >
              {{ isLogin ? "Create an account" : "Log in" }}
            </button>
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="absolute bottom-6 left-4 sm:left-12 lg:left-24 z-10">
      <p class="text-gray-600 text-xs">© Humanify All rights reserved.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";

const isLogin = ref(true);
const canvasRef = ref<HTMLCanvasElement | null>(null);

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

const toggleMode = () => {
  isLogin.value = !isLogin.value;
};

// Particle Animation Logic
let animationFrameId: number | null = null;
let particles: any[] = [];

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Create particles
  const particleCount = 600; // Slightly reduced for performance
  particles = [];

  const createParticles = () => {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 200 + Math.random() * 300;
      // Position planet on the right side (75% width)
      const centerX = canvas.width * 0.75;
      const centerY = canvas.height * 0.5;

      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        baseX: centerX + Math.cos(angle) * radius,
        baseY: centerY + Math.sin(angle) * radius,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        angle: angle,
        radius: radius,
        speed: Math.random() * 0.0003 + 0.0001,
      });
    }
  };

  createParticles();
  window.addEventListener("resize", createParticles);

  const animate = () => {
    // Clear with very slight fade for trail effect, matching bg color
    ctx.fillStyle = "rgba(3, 15, 30, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width * 0.75;
    const centerY = canvas.height * 0.5;

    particles.forEach((particle) => {
      particle.angle += particle.speed;
      particle.x = centerX + Math.cos(particle.angle) * particle.radius;
      particle.y = centerY + Math.sin(particle.angle) * particle.radius;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`; // Emerald-500
      ctx.fill();
    });

    // Draw connections
    particles.forEach((p1, i) => {
      // Check fewer particles for connections to save performance
      particles.slice(i + 1, i + 3).forEach((p2) => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - distance / 80)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });

    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  onUnmounted(() => {
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("resize", createParticles);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
});
</script>

<style scoped>
/* Ensure smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
