<script setup lang="ts">
import { ref } from 'vue'
import UserDetails from '@/modules/main/components/users/user-details.vue'
import { Categories } from '@/modules/data/categories'
import { Goals } from '@/modules/data/goals'
import { Users } from '@/modules/data/users'
import type { ThinkActionGoal } from '@/modules/types/think-action'

const states = ref({
  categories: Categories.filter((c) => Goals.some((s) => s.category.id === c.id)),
  posts: Goals,
  user: Users[0]
})
</script>

<template>
  <div class="main-content-container">
    <UserDetails
      :is_current_user="true"
      :posts="(states.posts as ThinkActionGoal[])"
      :categories="states.categories"
      :user="states.user"
    />
  </div>
</template>
