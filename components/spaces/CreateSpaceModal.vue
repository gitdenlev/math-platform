<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="handleClose"
      >
        <div
          class="relative w-full max-w-lg bg-white dark:bg-[#0f1115] rounded-md shadow-2xl transform transition-all animate-modal-enter border border-gray-100 dark:border-white/5 overflow-hidden"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-6 pt-4">
            <div class="flex flex-col gap-1.5">
              <h3
                class="text-2xl font-bold text-gray-900 dark:text-white font-['Outfit'] tracking-tight"
              >
                Створити простір
              </h3>
              <p
                class="text-sm text-gray-500 dark:text-gray-400 font-medium opacity-60"
              >
                Налаштуйте нове середовище для вашої роботи
              </p>
            </div>
            <button
              @click="handleClose"
              class="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all cursor-pointer"
            >
              <Icon name="ph:x-bold" size="18" />
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-4 space-y-6">
            <!-- Title Input -->
            <div class="space-y-2">
              <label
                class="block text-sm text-gray-400 dark:text-gray-500 ml-1"
              >
                Назва простору <span class="text-emerald-500/50">*</span>
              </label>
              <input
                ref="titleInput"
                v-model="form.title"
                type="text"
                placeholder="Алгебра, Фізика, тощо..."
                class="w-full px-2 py-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-md text-gray-900 dark:text-white placeholder-gray-400/50 font-medium transition-all focus:border-gray-300 dark:focus:border-white/20"
                @keydown.enter="handleCreate"
              />
            </div>

            <!-- Description Input -->
            <div class="space-y-2">
              <label
                class="block text-sm text-gray-400 dark:text-gray-500 ml-1"
              >
                Опис
                <span
                  class="text-gray-400 text-[10px] font-normal lowercase opacity-40"
                  >(необов'язково)</span
                >
              </label>
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Над чим ви працюєте сьогодні?"
                class="w-full px-2 py-1 bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-md text-gray-900 dark:text-white placeholder-gray-400/50 resize-none font-medium transition-all focus:border-gray-300 dark:focus:border-white/20"
                @keydown.ctrl.enter="handleCreate"
                @keydown.meta.enter="handleCreate"
              ></textarea>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-3 px-8 py-8">
            <button
              @click="handleClose"
              class="px-5 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-all cursor-pointer"
            >
              Скасувати
            </button>
            <button
              @click="handleCreate"
              :disabled="!form.title.trim()"
              class="px-8 py-3.5 text-sm font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 disabled:opacity-20 disabled:cursor-not-allowed rounded-md shadow-xl transition-all transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Створити простір</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick } from "vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
  create: [data: { title: string; description: string }];
}>();

const form = reactive({
  title: "",
  description: "",
});

const titleInput = ref<HTMLInputElement | null>(null);

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        titleInput.value?.focus();
      });
    }
  },
);

function handleClose() {
  emit("close");
  emit("update:modelValue", false);
  // Reset form after animation
  setTimeout(() => {
    form.title = "";
    form.description = "";
  }, 300);
}

function handleCreate() {
  if (!form.title.trim()) return;

  emit("create", { ...form });
  handleClose();
}

function applyTemplate(title: string, description: string) {
  form.title = title;
  form.description = description;
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.3s ease;
}

.modal-enter-from > div {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

.modal-leave-to > div {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

@keyframes modal-enter {
  from {
    transform: scale(0.9) translateY(20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.animate-modal-enter {
  animation: modal-enter 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
