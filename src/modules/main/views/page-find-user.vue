<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from '@/components/index'
import UserSneakPeak from '../components/user-sneakpeak.vue'

const form = ref({
  key: ''
})

const users = ref([
  {
    id: 'GhtHVSB12NHGBSGHHw',
    fullname: 'Fitri Andriyani',
    username: 'Fitri07',
    avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
    supporter: [
      {
        id: 'GhtHVSB12NHGBSGHHg',
        username: 'Alf'
      },
      {
        id: 'GhtHVSB12NHGBSGHdd',
        username: 'Ali'
      },
      {
        id: 'GhtHVSB12NHGBSGHHs',
        username: 'Aif'
      },
      {
        id: 'GhtHVSB12NHGBSGHtg',
        username: 'lif'
      }
    ]
  },
  {
    id: 'GhtHVSB12NHGBSGHHt',
    fullname: 'Fadil',
    username: 'Fadil_1w',
    avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
    supporter: [
      {
        id: 'GhtHVSB12NHGBSGHHg',
        username: 'Alf'
      },
      {
        id: 'GhtHVSB12NHGBSGHdd',
        username: 'Ali'
      }
    ]
  }
])
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
            :fullname="user.fullname"
            :username="user.username"
            :avatar="user.avatar"
            :supporter="user.supporter"
          >
          </UserSneakPeak>
        </router-link>
      </div>
    </div>
  </div>
</template>
