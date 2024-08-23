<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput, BasePopper } from '@/components/index'
import { appName } from '@/config/app'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const form = ref({
  key: ''
})

let isDropdownOpen = ref(false)
const userStore = useUserStore()

const toggleHeader = function () {
  isDropdownOpen.value = !isDropdownOpen.value
}

const links = [
  {
    label: 'Profile',
    path: '/profile'
  },
  {
    label: 'Monthly Reports',
    path: '/monthly-report'
  },
  {
    label: 'Yearly Reports',
    path: '/yearly-report'
  },
  {
    label: 'Logout',
    path: '/logout'
  }
]

const logout = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>

<template>
  <!-- Header Wrapper-->
  <nav class="header">
    <!-- Header  -->
    <div class="relative w-full flex">
      <div class="w-full flex items-center justify-between">
        <!-- Left: Sidebar Toggle Button -->
        <div class="flex">
          <!-- screen: sm -->
          <!-- <component :is="ComponentToggleSidebar" class="pr-4" /> -->
          <router-link :to="{ path: '/' }">
            <div class="flex">
              <img src="/main-logo.png" class="w-[30px] mr-1" alt="ThinkApp Logo" />
              <h1 class="text-base font-extrabold lg:text-lg">{{ appName }}</h1>
            </div>
          </router-link>
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

            <router-link class="font-medium" :to="{ path: '/' }">
              <span>Home</span>
            </router-link>

            <component :is="BasePopper" class="font-medium" placement="bottom-start">
              <button class="ml-5">Create Goals</button>
              <template #content>
                <div class="rounded-lg">
                  <router-link :to="{ path: '/create-resolution' }">
                    <button class="block px-5 py-3 w-full text-left bg-[#FFD5F3]">
                      Create Resolution
                    </button>
                    <hr />
                  </router-link>
                  <router-link :to="{ path: '/create-weekly-goals' }">
                    <button class="block px-5 py-3 w-full text-left bg-[#D5FFD6]">
                      Create Weekly Goals
                    </button>
                    <hr />
                  </router-link>
                  <router-link :to="{ path: '/complete-goals' }">
                    <button class="block px-5 py-3 w-full text-left bg-[#E5D5FF]">
                      Complete Goals
                    </button>
                  </router-link>
                </div>
              </template>
            </component>

            <router-link class="font-medium" :to="{ path: '/notification' }">
              <span>Notification</span>
            </router-link>

            <button @click="toggleHeader" class="avatar avatar-sm relative">
              <span class="avatar-initial rounded-full bg-warning text-white">JD</span>
            </button>

            <div
              v-if="isDropdownOpen"
              class="md:flex hidden absolute bg-white shadow-md rounded-md top-full right-0 w-fit min-w-[150px] flex-col"
            >
              <template v-for="(link, index) in links" :key="index">
                <router-link
                  v-if="link.label !== 'Logout'"
                  @click.enter="isDropdownOpen = false"
                  :to="{ path: link.path }"
                  class="text-sm font-normal text-slate-700 cursor-pointer px-4 py-2 hover:bg-slate-100"
                >
                  {{ link.label }}
                </router-link>
                <button
                  v-else
                  @click="logout"
                  class="text-sm font-normal text-slate-700 cursor-pointer px-4 py-2 hover:bg-slate-100"
                >
                  Logout
                </button>
              </template>
            </div>
          </div>
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
