<template>
  <div class="min-h-screen flex flex-col">
    <HumanifyHeader />

    <main class="flex-1">
      <div class="container p-6 mx-auto">
        <slot />
      </div>
    </main>

    <div class="container p-6 mx-auto">
      <HumanifyFooter />
    </div>
  </div>
</template>
