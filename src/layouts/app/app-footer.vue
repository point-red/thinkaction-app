<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

let visibility = ref(false)

let showDetailAccount = ref(false)

const toggle = () => {
  visibility.value = !visibility.value
  showDetailAccount.value = false
}

const toggleDetailAccountVisibility = () => {
  showDetailAccount.value = !showDetailAccount.value
  visibility.value = false
}
</script>

<template>
  <div>
    <!-- SLIDER - CREATE GOALS -->
    <div
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
    <div class="flex justify-between sm:static">
      <!-- NAV - HOMEPAGE -->
      <router-link class="w-full text-center" @click="visibility = false" :to="{ path: '/' }">
        <button class="btn btn-icon rounded-full">
          <i class="i-far-house h-25px w-25px"></i>
        </button>
      </router-link>

      <!-- NAV - SEARCH USER -->
      <router-link class="w-full text-center" @click="visibility = false" :to="{ path: '/find' }">
        <button class="btn btn-icon rounded-full">
          <i class="i-far-magnifying-glass h-25px w-25px"> </i>
        </button>
      </router-link>

      <!-- NAV - CREATE GOALS -->
      <div class="w-full text-center">
        <button @click="toggle" class="btn btn-icon rounded-full">
          <i class="i-far-square-plus h-25px w-25px"> </i>
        </button>
      </div>

      <!-- NAV - NOTIFICATIONS -->
      <router-link
        class="w-full text-center"
        @click="visibility = false"
        :to="{ path: '/notification' }"
      >
        <button class="btn btn-icon rounded-full">
          <i class="i-far-bell h-25px w-25px"> </i>
        </button>
      </router-link>

      <!-- NAV - DETAIL ACCOUNT -->
      <div class="w-full text-center">
        <button @click="toggleDetailAccountVisibility" class="btn btn-icon rounded-full">
          <i class="i-far-user h-25px w-25px"> </i>
        </button>
      </div>
    </div>
  </div>
</template>
