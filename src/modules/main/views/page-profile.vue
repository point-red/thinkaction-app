<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import UserDetails from '@/modules/main/components/users/user-details.vue'
import { Categories } from '@/modules/data/categories'
import type { ThinkActionGoal } from '@/modules/types/think-action'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

let goals = ref<any>([])

const states = ref<any>({
  categories: Categories.filter((c) => goals.value.some((s: any) => s.category === c.id)),
  goals: goals,
  user: {}
})

onMounted(async () => {
  states.value.user = await userStore.getUserById(userStore.currentUser._id)
  goals.value = userStore.currentUser?.categoryResolution ?? []
})
watch(userStore.currentUser, async () => {
  goals.value = userStore.currentUser?.categoryResolution ?? []
})
</script>

<template>
  <div class="main-content-container">
    <UserDetails
      :is_current_user="true"
      :posts="(states.goals as ThinkActionGoal[])"
      :categories="states.categories"
      :user="states.user"
    />
  </div>
</template>
