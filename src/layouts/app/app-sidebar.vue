<template>
  <div></div>
  <!-- Main Sidebar -->
  <!-- <div class="sidebar"> -->
  <!-- Sidebar Shortcut -->
  <!-- <app-sidebar-shortcut></app-sidebar-shortcut> -->

  <!-- Sidebar Panel -->
  <!-- <app-sidebar-panel></app-sidebar-panel> -->

  <!-- Sidebar Outside -->
  <!-- <div class="h-full w-full" @click="sidebarStore.closeSidebar()"></div> -->
  <!-- </div> -->
</template>

<style scoped lang="postcss">
.is-sidebar-open .sidebar {
  @apply fixed w-full h-full bg-black/50 z-30 lg:bg-black/0 lg:w-0 lg:h-0;
}
</style>
