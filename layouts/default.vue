<template>
  <div
    class="flex h-screen bg-white dark:bg-[#0c0c0c] font-sans text-gray-900 dark:text-gray-100 overflow-hidden"
  >
    <AppSidebar />

    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <main class="flex-1 relative w-full h-full overflow-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>
