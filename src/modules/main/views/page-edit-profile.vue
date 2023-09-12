<script setup lang="ts">
import { ref, computed } from 'vue'
import { BaseInput, BaseSelect } from '@/components/index'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const user = computed(() => {
  return userStore.currentUser
})

const list = [
  { id: 1, label: 'Private' },
  { id: 2, label: 'Public' }
]

const languages = ref([
  { id: 1, label: 'English' },
  { id: 2, label: 'Indonesian' }
])

const preferredLanguage = ref({ id: 1, label: 'English' })
</script>

<template>
  <div class="grid grid-cols-1 md:p-12 lg:p-4 md:p-[70px] lg:w-[700px] lg:text-md lg:m-auto">
    <div class="grid grid-cols-2">
      <router-link class="flex-grow" :to="{ path: '/profile/edit' }">
        <button class="w-full">
          <h3 class="font-medium border-b-2 text-blue-600 px-3 text-center py-3 text-base">
            Edit Profile
          </h3>
        </button>
      </router-link>
      <router-link class="flex-grow" :to="{ path: '/profile/edit-password' }">
        <button class="w-full">
          <h3 class="text-slate-400 hover:text-blue-600 px-3 text-center py-3 text-base">
            Edit Password
          </h3>
        </button>
      </router-link>
    </div>

    <div class="flex justify-center space-x-5 my-5">
      <img :src="user.avatar" alt="user photo" class="w-32 h-32 object-cover rounded-full" />
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

    <div class="flex flex-col md:px-0 px-3">
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
        :modelValue="user.is_private ? list[0] : list[1]"
        @update:modelValue="user.is_private = $event.id === 1"
        :list="list"
        border="full"
      ></component>

      <!-- share with -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Language</span>
      <component
        :is="BaseSelect"
        v-model="preferredLanguage"
        :list="languages"
        border="full"
      ></component>

      <div class="flex flex-col justify-center gap-y-2 my-8">
        <button class="btn btn-lg btn-primary bg-[#3D8AF7] px-7">Save</button>
        <router-link :to="'/profile'" class="btn btn-lg btn-primary bg-[#de2a2a]"
          >Cancel</router-link
        >
      </div>
    </div>
  </div>
</template>
