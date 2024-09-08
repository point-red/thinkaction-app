<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BaseInput } from '@/components/index'
import UserSneakPeak from '../components/user-sneakpeak.vue'
import { watchDebounced } from '@vueuse/core'
import client from '@/lib/connection'

const form = ref({
  key: ''
})

const users = ref<any>([])
const histories = ref<any>([])

const searchUsers = async () => {
  if (form.value.key === '') {
    const {
      data: { data }
    } = await client().get(`/users/history`)
    histories.value = data
  } else {
    const {
      data: { data }
    } = await client().get(`/users/search?username=${form.value.key}`)
    users.value = data
  }
}

const addToHistory = async (id: string) => {
  await client().post(`/users/history`, { id })
}

const clearHistory = async () => {
  await client().delete('/users/history')
  histories.value = []
}

onMounted(async () => {
  await searchUsers()
})

watchDebounced(
  () => form.value.key,
  async () => {
    await searchUsers()
  }
)
</script>

<template>
  <div class="main-content-container">
    <component
      :is="BaseInput"
      v-model="form.key"
      placeholder="Cari pengguna"
      class="border-2 border-slate rounded-lg"
    >
    </component>

    <!-- search result -->
    <div v-if="!form.key">
      <div class="flex justify-end -mt-2">
        <button @click="clearHistory" class="px-4 py-2 text-xs rounded-md hover:bg-slate-100">
          Clear history
        </button>
      </div>
      <div v-for="user in histories" :key="user._id">
        <router-link :to="{ path: `user/${user._id}` }">
          <UserSneakPeak
            :id="user._id"
            :fullname="user.fullname"
            :username="user.username"
            :avatar="user.photo"
            :supporter="user.supportedBy"
            @add="addToHistory"
          >
          </UserSneakPeak>
        </router-link>
      </div>
    </div>

    <!-- search result -->
    <div v-if="form.key">
      <div v-for="user in users" :key="user._id">
        <router-link :to="{ path: `user/${user._id}` }">
          <UserSneakPeak
            :id="user._id"
            :fullname="user.fullname"
            :username="user.username"
            :avatar="user.photo"
            :supporter="user.supportedBy"
            @add="addToHistory"
          >
          </UserSneakPeak>
        </router-link>
      </div>
    </div>
  </div>
</template>
