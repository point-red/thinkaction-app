<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppPreloader from '@/components/app-preloader.vue'
import AppHeader from './app-header.vue'
import AppSidebar from './app-sidebar.vue'
import AppFooter from './app-footer.vue'
import { usePostStore } from '@/stores/post';
import { onMounted } from 'vue';

const postStore = usePostStore();

onMounted(async () => {
  await postStore.getPosts({
    params: {
      limit: 7,
      page: 1,
    },
  }, true); // Force load the initial data
});
</script>

<template>
  <!-- Preloader -->
  <app-preloader class="print:hidden"></app-preloader>

  <!-- Page Wrapper -->
  <div class="flex grow bg-slate-50 dark:bg-slate-900 vhh">
    <!-- Header -->
    <app-header class="print:hidden"></app-header>
    <!-- Sidebar -->
    <app-sidebar class="print:hidden"></app-sidebar>
    <!-- Main Content -->
    <div class="main-container">
      <main class="main-content">
        <router-view />
      </main>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<style lang="postcss">
.main-container {
  @apply flex flex-col w-full;
}

.vhh {
  height: 100dvh;
}

.is-sidebar-open .main-container {
  @apply lg:w-[calc(100%-(var(--sidebar-shortcut-width)+var(--sidebar-panel-width)))] lg:ml-[calc(var(--sidebar-shortcut-width)+var(--sidebar-panel-width))];
}

.main-content {
  @apply mt-[60px] px-4 flex-1 overflow-y-auto;
}

.main-content-container {
  @apply my-2 space-y-5;
}

.main-content-header {
  @apply flex space-x-4 py-2 overflow-x-hidden;
}

.main-content-body {
  @apply flex flex-col space-y-5;
}
</style>
