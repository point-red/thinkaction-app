<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from '@/components/index'

const state = ref({
  confirm_password: '',
  password: ''
})

const getPasswordErrorMessage = function () {
  if (state.value.password.length < 8) {
    return 'Password is too short'
  }
  return ''
}

const getConfirmErrorMessage = function () {
  if (getPasswordErrorMessage().length) {
    return ''
  }

  return state.value.confirm_password === state.value.password
    ? ''
    : 'Confirm Password should be equal to password'
}
</script>

<template>
  <div class="grid grid-cols-1 md:p-12 lg:p-4 md:p-[70px] lg:w-[700px] lg:text-md lg:m-auto">
    <div class="grid grid-cols-2">
      <router-link class="flex-grow" :to="{ path: '/profile/edit' }">
        <button class="w-full">
          <h3 class="text-slate-400 hover:text-blue-600 px-3 text-center py-3 text-base">
            Edit Profile
          </h3>
        </button>
      </router-link>
      <router-link class="flex-grow" :to="{ path: '/profile/edit-password' }">
        <button class="w-full">
          <h3 class="font-medium border-b-2 text-blue-600 px-3 text-center py-3 text-base">
            Edit Password
          </h3>
        </button>
      </router-link>
    </div>

    <div class="flex flex-col md:px-0 px-3">
      <!-- input - full_name -->
      <span class="font-semibold text-[#3D8AF7] block mb-2 mt-8">New Password</span>
      <BaseInput
        :error="getPasswordErrorMessage()"
        v-model="state.password"
        class="mb-8"
      ></BaseInput>

      <!-- input - username -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Password Conformation</span>
      <BaseInput
        :error="getConfirmErrorMessage()"
        v-model="state.confirm_password"
        class="mb-8"
      ></BaseInput>

      <div class="flex flex-col justify-center gap-y-2 my-8">
        <button class="btn btn-lg btn-primary bg-[#3D8AF7]">Save</button>
        <router-link :to="'/profile'" class="btn btn-lg btn-primary bg-[#de2a2a]"
          >Cancel</router-link
        >
      </div>
    </div>
  </div>
</template>
