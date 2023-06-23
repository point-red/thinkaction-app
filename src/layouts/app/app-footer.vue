<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- home, search, add, notifs, account -->
  <div class="flex justify-between px-5 sm:static">
    <button class="btn btn-icon rounded-full">
      <i class="i-far-house h-25px w-25px">
        <router-link :to="{ path: '/' }"> </router-link>
      </i>
    </button>
    <button class="btn btn-icon rounded-full">
      <i class="i-far-magnifying-glass h-25px w-25px">
        <router-link :to="{ path: '/find' }"> </router-link>
      </i>
    </button>
    <button class="btn btn-icon rounded-full">
      <i class="i-far-square-plus h-25px w-25px">
        <router-link :to="{ path: '/create-goals' }"> </router-link>
      </i>
    </button>
    <button class="btn btn-icon rounded-full">
      <i class="i-far-bell h-25px w-25px">
        <router-link :to="{ path: '/notifications' }"> </router-link>
      </i>
    </button>
    <button class="btn btn-icon rounded-full">
      <i class="i-far-user h-25px w-25px">
        <router-link :to="{ path: '/profile' }"> </router-link>
      </i>
    </button>
  </div>
</template>
