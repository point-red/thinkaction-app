<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from '@/components/index'

const user = ref({
  id: 'GhtHVSB12NHGBSGHHg',
  full_name: 'Fitri Andriyani',
  username: 'fitri07',
  email: 'fitri07@gmail.com',
  password: '123456',
  avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
  bio: 'nothing to see here',
  is_private: false
})
</script>

<template>
  <div class="grid grid-cols-1 md:p-12 lg:p-4 md:p-[70px] lg:w-[700px] lg:text-md lg:m-auto">
    <div class="flex justify-between">
      <router-link :to="{ path: '/profile/edit' }">
        <button>
          <h3 class="font-semibold hover:text-blue-600">Edit Profile</h3>
        </button>
      </router-link>
      <router-link :to="{ path: '/profile/edit-password' }">
        <button>
          <h3 class="font-semibold hover:text-blue-600">Edit Password</h3>
        </button>
      </router-link>
    </div>
    <hr class="bg-slate h-[1px]" />

    <!-- input - full_name -->
    <span class="font-semibold text-[#3D8AF7] block mb-2 mt-8">New Password</span>
    <component :is="BaseInput" v-model="user.password" class="mb-8"></component>

    <!-- input - username -->
    <span class="font-semibold text-[#3D8AF7] block mb-2">Password Conformation</span>
    <component :is="BaseInput" v-model="user.password" class="mb-8"></component>

    <div class="flex justify-center space-x-8 mt-8">
      <button class="btn btn-primary bg-[#3D8AF7] px-7">SAVE</button>
      <button class="btn btn-primary bg-[#de2a2a]">CANCEL</button>
    </div>
  </div>
</template>
