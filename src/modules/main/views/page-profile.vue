<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserDetails from '@/modules/main/components/users/user-details.vue'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const states = ref<any>({
  user: {}
})

onMounted(async () => {
  states.value.user = await userStore.getUserById(userStore.currentUser._id)
})
</script>

<template>
  <div class="main-content-container">
    <UserDetails :is_current_user="true" :user="states.user" />
  </div>
</template>
