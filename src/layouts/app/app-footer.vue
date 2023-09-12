<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

let visibility = ref(false)

let showDetailAccount = ref(false)

const toggle = (e: any) => {
  e.stopPropagation()
  visibility.value = !visibility.value
  showDetailAccount.value = false
}

const toggleDetailAccountVisibility = (e: any) => {
  e.stopPropagation()
  showDetailAccount.value = !showDetailAccount.value
  visibility.value = false
}

const defaultClick = () => {
  showDetailAccount.value = false
  visibility.value = false
}

const route = useRoute()

const menus = [
  {
    path: '/',
    default: true,
    fillIcon: 'i-fas-house',
    borderIcon: 'i-far-house',
    click: defaultClick
  },
  {
    path: '/find',
    default: true,
    fillIcon: 'i-fas-magnifying-glass',
    borderIcon: 'i-far-magnifying-glass',
    click: defaultClick
  },
  {
    fillIcon: 'i-fas-square-plus',
    borderIcon: 'i-far-square-plus',
    click: toggle
  },
  {
    path: '/notification',
    default: true,
    fillIcon: 'i-fas-bell',
    borderIcon: 'i-far-bell',
    click: defaultClick
  },
  {
    path: '/profile',
    fillIcon: 'i-fas-user',
    borderIcon: 'i-far-user',
    click: toggleDetailAccountVisibility
  }
]
</script>

<template>
  <div>
    <!-- SLIDER - CREATE GOALS -->
    <div
      v-click-outside
      @onClickOutside="() => (visibility = false)"
      @click="toggle"
      v-if="visibility"
      class="font-semibold rounded-t-[30px] bg-blue text-center text-white space-y-[20px] py-[20px]"
    >
      <router-link class="block" :to="{ path: '/create-resolution' }"
        >Create Resolution</router-link
      >
      <hr />
      <router-link class="block" :to="{ path: '/create-weekly-goals' }"
        >Create Weekly Goals</router-link
      >
      <hr />
      <router-link class="block" :to="{ path: '/complete-goals' }">Complete Goals</router-link>
    </div>

    <!-- SLIDER - DETAIL ACCOUNT -->
    <div
      v-click-outside
      @onClickOutside="(e: any) => (showDetailAccount = false)"
      @click="toggleDetailAccountVisibility"
      v-if="showDetailAccount"
      class="font-semibold rounded-t-[30px] bg-blue text-center text-white space-y-[20px] py-[20px]"
    >
      <router-link class="block" :to="{ path: '/profile' }">Profile Account</router-link>
      <hr />
      <router-link class="block" :to="{ path: '/monthly-report' }">Monthly Report</router-link>
      <hr />
      <router-link class="block" :to="{ path: '/yearly-report' }">Yearly Report</router-link>
      <hr />
      <router-link class="block" :to="{ path: '/my-invoice' }">My Invoice</router-link>
    </div>

    <!-- BUTTON NAVIGATION -->
    <div class="flex justify-between sm:static py-4">
      <component
        v-for="(menu, index) in menus"
        class="w-full text-center"
        :key="index"
        :is="menu.default ? RouterLink : 'div'"
        v-bind="
          menu.default
            ? {
                to: { path: menu.path }
              }
            : {}
        "
      >
        <button @click="menu.click" class="btn btn-icon rounded-full">
          <i
            class="h-25px w-25px"
            :class="menu.path === route.path ? menu.fillIcon : menu.borderIcon"
          ></i>
        </button>
      </component>
    </div>
  </div>
</template>
