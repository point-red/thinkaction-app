<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from '@/components/index'
import ComponentToggleSidebar from './component-toggle-sidebar.vue'
import { appName } from '@/config/app'

const form = ref({
  key: ''
})
</script>

<template>
  <!-- Header Wrapper-->
  <nav class="header">
    <!-- Header  -->
    <div class="relative w-full flex">
      <div class="w-full flex items-center justify-between">
        <!-- Left: Sidebar Toggle Button -->
        <div class="flex">
          <div class="flex">
            <img src="/main-logo.png" class="w-[30px] mr-1" alt="ThinkApp Logo" />
            <h1 class="text-base font-extrabold lg:text-lg">{{ appName }}</h1>
          </div>
        </div>

        <!-- Right: Header Buttons -->
        <div>
          <!-- screen: lg -->
          <div class="invisible md:visible flex items-center space-x-5">
            <component
              :is="BaseInput"
              v-model="form.key"
              placeholder="Cari pengguna"
              class="border-2 border-slate rounded-lg"
            ></component>
            <a href="">Home</a>
            <a href=""></a>
            <button>Create Goals</button>
            <a href="">Notification</a>
            <div class="avatar avatar-sm">
              <span class="avatar-initial rounded-full bg-warning text-white">JD</span>
            </div>
          </div>

          <!-- screen: sm -->
          <component :is="ComponentToggleSidebar" class="pr-4" />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="postcss">
nav.header {
  @apply fixed top-0 flex w-full h-60px z-20 px-4 bg-white dark:bg-slate-900 shadow;
}

.is-sidebar-open nav.header {
  @apply lg:w-[calc(100%-(var(--sidebar-shortcut-width)+var(--sidebar-panel-width)))] lg:ml-[calc(var(--sidebar-shortcut-width)+var(--sidebar-panel-width))] duration-200;
}
</style>
