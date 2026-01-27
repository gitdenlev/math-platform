import { onBeforeUnmount, onMounted, Ref, unref } from "vue";

export function onClickOutside(
  target: Ref<HTMLElement | null>,
  handler: (event: MouseEvent) => void,
) {
  const listener = (event: MouseEvent) => {
    const el = unref(target);
    if (!el || el === event.target || el.contains(event.target as Node)) {
      return;
    }
    handler(event);
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });
}
