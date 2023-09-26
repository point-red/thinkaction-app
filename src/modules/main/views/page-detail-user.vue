<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
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
  let user = await userStore.findUserById(route.params.id as string)
  goals.value = (await userStore.getGoalsSorted(false)).filter((g) => g.user_id === route.params.id)
  states.value.user = user
})
watch(userStore.userGoals, async () => {
  const data = await userStore.getGoalsSorted()
  goals.value = data.filter((g) => g.user_id === route.params.id)
})
</script>

<template>
  <div v-if="states.user" class="main-content-container">
    <UserDetails
      :is_current_user="userStore.currentUser?.id === (route.params.id as string)"
      :posts="(states.goals as ThinkActionGoal[])"
      :categories="states.categories"
      :user="states.user"
    />
  </div>
</template>
