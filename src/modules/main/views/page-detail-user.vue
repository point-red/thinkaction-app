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
  categories: [],
  goals: goals,
  user: {}
})

onMounted(async () => {
  states.value.user = await userStore.getUserById(route.params.id as string)
  goals.value = states.value.user?.categoryResolution ?? []
})
watch(states.value.user, async () => {
  goals.value = states.value.user?.categoryResolution ?? []
})
</script>

<template>
  <div v-if="states.user" class="main-content-container">
    <UserDetails
      :is_current_user="userStore.currentUser?._id === (route.params.id as string)"
      :posts="(states.goals as ThinkActionGoal[])"
      :categories="states.categories"
      :user="states.user"
      @update="(u: any) => states.user = u"
    />
  </div>
</template>
