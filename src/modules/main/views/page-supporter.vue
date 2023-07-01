<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from '@/components/index'
import UserSneakpeak from '../components/user-sneakpeak.vue'

const supporters = ref([
  {
    user_support_id: 'jA2jnsbg55468',
    fullname: 'Fitri',
    username: 'fitria07',
    is_supporting: false,
    avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
    supporter: [
      {
        id: 'GhtHVSB12NHGBSGHHg',
        username: 'Alf'
      }
    ]
  },
  {
    user_support_id: 'jA2jnsb3T5468',
    fullname: 'Fadil',
    username: 'fadil_1w',
    is_supporting: true,
    avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
    supporter: [
      {
        id: 'GhtHVSB12NHGBSGHHg',
        username: 'Alf'
      }
    ]
  },
  {
    user_support_id: 'jA2jnsb2T5468',
    fullname: 'Jaemin',
    username: 'jaemin',
    is_supporting: false,
    avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
    supporter: [
      {
        id: 'GhtHVSB12NHGBSGHHg',
        username: 'Alf'
      }
    ]
  },
  {
    user_support_id: 'jA2jnsggT5468',
    fullname: 'Jeno',
    username: 'jeno',
    is_supporting: false,
    avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
    supporter: [
      {
        id: 'GhtHVSB12NHGBSGHHg',
        username: 'Alf'
      }
    ]
  }
])

const form = ref({
  key: ''
})
</script>

<template>
  <div class="main-content-container">
    <!-- SEARCH -->
    <component
      :is="BaseInput"
      v-model="form.key"
      placeholder="Cari pengguna"
      class="border-1 border-slate rounded-lg"
    >
    </component>

    <!-- LIST SUPPORTER -->
    <div
      class="flex justify-between"
      v-for="supporter in supporters"
      :key="supporter.user_support_id"
    >
      <router-link :to="{ path: `user/${supporter.user_support_id}` }">
        <UserSneakpeak
          :id="supporter.user_support_id"
          :fullname="supporter.fullname"
          :username="supporter.username"
          :avatar="supporter.avatar"
          :supporter="supporter.supporter"
        ></UserSneakpeak>
      </router-link>
      <div class="flex space-x-2">
        <button
          v-if="supporter.is_supporting == true"
          class="bg-slate-400 h-[40px] rounded-lg mt-6 px-3 text-white font-semibold"
        >
          Supporting
        </button>
        <button
          v-if="supporter.is_supporting == false"
          class="bg-[#3D8AF7] h-[40px] rounded-lg mt-6 px-6 text-white font-semibold"
        >
          Support
        </button>
        <button class="bg-slate-400 h-[40px] rounded-lg mt-6 px-3 text-white font-semibold">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
