<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import UserDetails from '@/modules/main/components/users/user-details.vue'
import { Categories } from '@/modules/data/categories'
import type { ThinkActionGoal } from '@/modules/types/think-action'

import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()

let goals = ref<any>([])

const states = ref<any>({
  categories: Categories.filter((c) => goals.value.some((s: any) => s.category === c.id)),
  goals: goals,
  user: {}
})

onMounted(async () => {
  let user = await userStore.findUserById(userStore.currentUser.id)
  states.value.user = user
  goals.value = (await userStore.getGoalsSorted()).filter(
    (g) => g.user_id === userStore.currentUser.id
  )
})
watch(userStore.userGoals, (currentValue, oldValue) => {
  userStore.getGoalsSorted().then((r) => {
    goals.value = r.filter((g) => g.user_id === userStore.currentUser.id)
  })
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
