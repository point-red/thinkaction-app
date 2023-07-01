<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput, BaseSelect } from '@/components/index'

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

const list = [
  { id: 1, label: 'Private' },
  { id: 2, label: 'Public' }
]

const languages = ref([
  { id: 1, label: 'English' },
  { id: 2, label: 'Indonesian' }
])
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

    <div class="flex justify-center space-x-5 mt-5">
      <img :src="user.avatar" alt="user photo" class="rounded-full" />
      <div class="mt-5">
        <p>{{ user.full_name }}</p>

        <!-- CHANGE FOTO PROFILE -->
        <span class="font-semibold text-[#3D8AF7] block mb-2">Change your profile picture</span>
        <label class="btn btn-primary bg-[#3D8AF7] mb-8">
          <input type="file" class="pointer-events-none absolute opacity-0" />
          <div class="flex items-center space-x-2">
            <i class="block i-far-arrow-up-from-bracket"></i>
            <span>Choose File</span>
          </div>
        </label>
      </div>
    </div>

    <!-- input - full_name -->
    <span class="font-semibold text-[#3D8AF7] block mb-2">Full Name</span>
    <component :is="BaseInput" v-model="user.full_name" class="mb-8"></component>

    <!-- input - username -->
    <span class="font-semibold text-[#3D8AF7] block mb-2">Username</span>
    <component :is="BaseInput" v-model="user.username" class="mb-8"></component>

    <!-- input - email -->
    <span class="font-semibold text-[#3D8AF7] block mb-2">Email</span>
    <component :is="BaseInput" v-model="user.email" class="mb-8"></component>

    <!-- input - bio -->
    <span class="font-semibold text-[#3D8AF7] block mb-2">Bio</span>
    <component :is="BaseInput" v-model="user.bio" class="mb-8"></component>

    <!-- share with -->
    <span class="font-semibold text-[#3D8AF7] block mb-2">Account Type</span>
    <component
      :is="BaseSelect"
      class="mb-8"
      v-model="user.is_private"
      :list="list"
      border="full"
    ></component>

    <!-- share with -->
    <span class="font-semibold text-[#3D8AF7] block mb-2">Language</span>
    <component :is="BaseSelect" v-model="languages" :list="languages" border="full"></component>

    <div class="flex justify-center space-x-8 mt-8">
      <button class="btn btn-primary bg-[#3D8AF7] px-7">SAVE</button>
      <button class="btn btn-primary bg-[#de2a2a]">CANCEL</button>
    </div>
  </div>
</template>
