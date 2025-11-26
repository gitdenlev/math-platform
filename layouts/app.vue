<template>
  <div class="h-screen bg-white">
    <Sidebar />
    <main class="">
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
import Sidebar from '~/components/sidebar/Sidebar.vue'
</script>
