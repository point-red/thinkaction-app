<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UserDetails from '@/modules/main/components/users/user-details.vue'
import { Categories } from '@/modules/data/categories'
import { Goals } from '@/modules/data/goals'
import { Users } from '@/modules/data/users'
import type { ThinkActionGoal } from '@/modules/types/think-action'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { UserModel } from '@/lib/models/UserModel'
const states = ref<any>({
  categories: Categories.filter((c) => Goals.some((s) => s.category.id === c.id)),
  goals: Goals,
  user: {}
})
const userStore = useUserStore()
const route = useRoute()

onMounted(async () => {
  let user = await UserModel.findUserById(route.params.id as string)
  states.value.user = user
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
