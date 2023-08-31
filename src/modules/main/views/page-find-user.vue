<script setup lang="ts">
import { computed, ref } from 'vue'
import { BaseInput } from '@/components/index'
import UserSneakPeak from '../components/user-sneakpeak.vue'
import { Users } from '@/modules/data/users'

const form = ref({
  key: ''
})

const users = computed(() => {
  return Users.filter((u) =>
    [u.username.toLowerCase(), u.full_name.toLowerCase()].some((a) =>
      a.includes(form.value.key.toLowerCase())
    )
  )
})
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
      <div v-for="user in users" :key="user.id">
        <router-link :to="{ path: `user/${user.id}` }">
          <UserSneakPeak
            :id="user.id"
            :fullname="user.full_name"
            :username="user.username"
            :avatar="user.avatar"
            :supporter="['Alf', 'Risky']"
          >
          </UserSneakPeak>
        </router-link>
      </div>
    </div>
  </div>
</template>
