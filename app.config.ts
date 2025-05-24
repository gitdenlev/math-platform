export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: "bg-emerald-600 text-white cursor-pointer",
      },
      defaultVariants: {
        size: "xl",
        variant: "solid",
        color: "emerald",
      },
    },
    // Customizing the badge component
    badge: {
      slots: {
        base: "bg-emerald-600 text-white !rounded-full",
      },
      defaultVariants: {
        size: "xl",
        variant: "solid",
        color: "emerald",
      },
    },
  },
});
