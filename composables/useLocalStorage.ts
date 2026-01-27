import { ref, watch } from "vue";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue);

  // Load from localStorage only on client
  if (process.client) {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        data.value = JSON.parse(stored);
      } catch (e) {
        console.error(`Failed to parse localStorage item ${key}:`, e);
        data.value = defaultValue;
      }
    }
  }

  // Watch for changes and save to localStorage
  if (process.client) {
    watch(
      data,
      (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));
      },
      { deep: true },
    );
  }

  return data;
}
