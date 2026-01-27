import { useSpacesStore } from "~/stores/spaces";

export default defineNuxtPlugin(() => {
  // This plugin runs ONLY on client side
  const spacesStore = useSpacesStore();

  // Load data from localStorage on client initialization
  if (!spacesStore.isLoaded) {
    spacesStore.loadFromStorage();
  }
});
