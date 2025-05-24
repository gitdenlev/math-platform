<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "Наше відео",
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const videoElement = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(props.autoplay); // Початковий стан відтворення
const volume = ref(70); // Початкова гучність
const currentTime = ref(0);
const duration = ref(0);
const isLoading = ref(true);

defineEmits(["close"]);

// Функції керування відео
const togglePlay = (event: Event) => {
  // Запобігання поширенню події, щоб не викликати батьківські обробники
  event.stopPropagation();

  if (videoElement.value) {
    if (isPlaying.value) {
      videoElement.value.pause();
    } else {
      videoElement.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
};

const handleTimeUpdate = () => {
  if (videoElement.value) {
    currentTime.value = videoElement.value.currentTime;
  }
};

const handleLoadedMetadata = () => {
  if (videoElement.value) {
    duration.value = videoElement.value.duration;
    isLoading.value = false;
    // Autoplay logic: play if autoplay prop is true
    if (props.autoplay) {
      videoElement.value.play().catch((error) => {
        // Catch autoplay policy error (e.g., browsers often block autoplay with sound)
        console.warn("Autoplay failed:", error);
        isPlaying.value = false; // Set to paused if autoplay fails
      });
      isPlaying.value = true;
    }
  }
};

const handleCanPlay = () => {
  isLoading.value = false;
};

const handleWaiting = () => {
  isLoading.value = true;
};

const seekVideo = (event: MouseEvent) => {
  // Запобігання поширенню події
  event.stopPropagation();

  if (videoElement.value && duration.value > 0) {
    const progressBar = event.currentTarget as HTMLElement;
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const percentage = clickX / progressBar.offsetWidth;
    videoElement.value.currentTime = duration.value * percentage;
  }
};

const setVolume = (value: number, event?: Event) => {
  // Запобігання поширенню події, якщо вона існує
  if (event) {
    event.stopPropagation();
  }

  volume.value = value;
  if (videoElement.value) {
    videoElement.value.volume = value / 100; // HTMLMediaElement.volume приймає значення від 0.0 до 1.0
  }
};

// Обробник для перемикання звуку
const toggleMute = (event: Event) => {
  event.stopPropagation();
  setVolume(volume.value === 0 ? 70 : 0);
};

// Форматування часу для відображення
const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

// Встановлюємо початкову гучність після монтування компонента
onMounted(() => {
  if (videoElement.value) {
    videoElement.value.volume = volume.value / 100;
  }
});

// Додаємо обробник для припинення відтворення при закритті
watch(
  () => props.isVisible,
  (newValue) => {
    if (!newValue && videoElement.value) {
      videoElement.value.pause();
      isPlaying.value = false;
    }
  }
);
</script>

<template>
  <div
    v-if="isVisible"
    class="video-wrapper fixed inset-0 z-50 flex items-center justify-center bg-black/80"
  >
    <div class="relative w-full max-w-4xl mx-4">
      <button
        class="absolute -top-10 right-0 text-white hover:text-emerald-400 transition-colors"
        @click="$emit('close')"
      >
        <Icon name="mdi:close" class="text-2xl" />
      </button>

      <div
        class="video-container relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-lg"
      >
        <video
          ref="videoElement"
          :src="src"
          :autoplay="autoplay"
          :loop="loop"
          class="absolute inset-0 w-full h-full object-cover"
          @timeupdate="handleTimeUpdate"
          @loadedmetadata="handleLoadedMetadata"
          @ended="isPlaying = false"
          @waiting="handleWaiting"
          @canplay="handleCanPlay"
          preload="metadata"
          @click.stop="togglePlay($event)"
        ></video>

        <div
          class="video-controls absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-gray-900/80 to-transparent flex flex-col items-center z-20 transition-opacity duration-300"
        >
          <div
            class="w-full h-2 bg-gray-600 rounded-full mb-3 cursor-pointer overflow-hidden"
            @click.stop="seekVideo"
          >
            <div
              class="h-full bg-emerald-400 rounded-full transition-all duration-100 ease-linear"
              :style="{ width: `${(currentTime / duration) * 100 || 0}%` }"
            ></div>
          </div>

          <div class="flex items-center justify-between w-full text-white px-2">
            <div class="flex items-center gap-4">
              <button
                class="rounded-full flex items-center p-1 hover:bg-emerald-700 transition-transform duration-200 text-white focus:outline-none"
                @click.stop="togglePlay($event)"
                :disabled="isLoading"
              >
                <Icon
                  :name="isPlaying ? 'mdi:pause' : 'mdi:play'"
                  class="text-xl"
                />
              </button>

              <div class="text-sm font-bold">
                {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
              </div>
            </div>

            <div>
              <Icon
                :name="volume === 0 ? 'mdi:volume-off' : 'mdi:volume-high'"
                class="text-xl cursor-pointer"
                @click.stop="toggleMute($event)"
              />
              <URange
                :model-value="volume"
                @update:model-value="(val) => setVolume(val, $event)"
                min="0"
                max="100"
                color="emerald"
                class="w-24 h-2"
                @click.stop
              />
            </div>
          </div>
        </div>

        <div
          v-if="isLoading"
          class="absolute inset-0 bg-black/80 flex items-center justify-center z-30"
        >
          <Icon
            name="mdi:loading"
            class="text-emerald-500 text-6xl animate-spin"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-wrapper {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
}

.video-container {
  position: relative;
  width: 100%;
  max-width: 64rem;
  margin: 0 1rem;
  aspect-ratio: 16/9;
}

.video-controls {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.video-container:hover .video-controls,
.video-controls:hover {
  opacity: 1;
  pointer-events: auto;
}
</style>
