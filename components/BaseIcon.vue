<template>
  <img
    :src="src"
    :alt="alt"
    class="inline-block object-contain select-none transition-all duration-200"
    :style="styles"
    draggable="false"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    src: string;
    size?: number | string;
    alt?: string;
  }>(),
  {
    size: 24,
    alt: "icon",
  }
);

const styles = computed(() => {
  const s = typeof props.size === "number" ? `${props.size}px` : props.size;
  return {
    width: s,
    height: s,
    minWidth: s,
    minHeight: s,
  };
});
</script>
