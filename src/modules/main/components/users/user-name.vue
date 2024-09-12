<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const userStore = useUserStore()
const user = computed(() => userStore.currentUser)
</script>
<template>
  <span>{{ user?.fullname?.split(' ')?.[0] ?? '' }}</span>
</template>
