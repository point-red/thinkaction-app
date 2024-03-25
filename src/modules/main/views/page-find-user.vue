<script setup lang="ts">
import { computed, ref } from 'vue'
import { BaseInput } from '@/components/index'
import UserSneakPeak from '../components/user-sneakpeak.vue'
import { Users } from '@/modules/data/users'
import { watchDebounced } from '@vueuse/core'
import client from '@/lib/connection'

const form = ref({
  key: ''
})

const users = ref<any>([])

watchDebounced(
  () => form.value.key,
  async () => {
    const {
      data: { data }
    } = await client().get(`/users/search?username=${form.value.key}`)
    users.value = data
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
    <div>
      <div v-for="user in users" :key="user._id">
        <router-link :to="{ path: `user/${user._id}` }">
          <UserSneakPeak
            :id="user._id"
            :fullname="user.fullname"
            :username="user.username"
            :avatar="user.photo"
            :supporter="['Alf', 'Risky']"
          >
          </UserSneakPeak>
        </router-link>
      </div>
    </div>
  </div>
</template>
