<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import UserDetails from '@/modules/main/components/users/user-details.vue'
import { Categories } from '@/modules/data/categories'
import { Goals } from '@/modules/data/goals'
import { Users } from '@/modules/data/users'
import type { ThinkActionGoal } from '@/modules/types/think-action'

import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { UserModel } from '@/lib/models/UserModel'

const userStore = useUserStore()
const route = useRoute()

let goals = computed(() => {
  return userStore.getGoalsSorted().filter((g) => g.user_id === route.params.id)
})

const states = ref<any>({
  categories: Categories.filter((c) => goals.value.some((s) => s.category === c.id)),
  goals: goals,
  user: {}
})

onMounted(async () => {
  let user = await userStore.findUserById(userStore.currentUser.id as string)
  states.value.user = user
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
