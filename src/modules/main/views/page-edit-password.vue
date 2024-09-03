<script setup lang="ts">
import { ref, computed } from 'vue'
import { BaseInput } from '@/components/index'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const state = ref({
  current_password: '',
  confirm_password: '',
  password: '',
  error: ''
})

const router = useRouter()

const userStore = useUserStore()
const needsPassword = computed(() => userStore.currentUser?.needsPassword)

const getCurrentPasswordErrorMessage = function () {
  if (state.value.current_password.length < 8) {
    return 'Current password must be filled'
  }
  return ''
}

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

const isDisabled = computed(() => {
  if (!needsPassword.value && state.value.current_password.length < 8) {
    return true
  }
  return state.value.password.length < 8 || state.value.confirm_password !== state.value.password
})

const savePassword = async () => {
  state.value.error = ''
  if (isDisabled.value) {
    return
  }
  const done = await userStore.updatePassword(state.value.password, state.value.current_password)
  if (done === true) {
    router.push('/profile')
  } else if (typeof done === 'string') {
    state.value.error = done
  } else {
    state.value.error = 'Some error occurred.'
  }
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
      <div class="mb-8" />
      <template v-if="!needsPassword">
        <span class="font-semibold text-[#3D8AF7] block mb-2">Current Password</span>
        <BaseInput
          :error="getCurrentPasswordErrorMessage()"
          v-model="state.current_password"
          class="mb-8"
        ></BaseInput>
      </template>

      <span class="font-semibold text-[#3D8AF7] block mb-2">New Password</span>
      <BaseInput
        :error="getPasswordErrorMessage()"
        v-model="state.password"
        class="mb-8"
      ></BaseInput>

      <span class="font-semibold text-[#3D8AF7] block mb-2">Password Conformation</span>
      <BaseInput
        :error="getConfirmErrorMessage()"
        v-model="state.confirm_password"
        class="mb-8"
      ></BaseInput>
      <span class="text-sm mt-1 text-red-400" v-if="state.error">{{ state.error }}</span>

      <div class="flex flex-col justify-center gap-y-2 my-8">
        <button
          @click="savePassword"
          :disabled="isDisabled"
          class="btn btn-lg btn-primary bg-[#3D8AF7]"
        >
          Save
        </button>
        <router-link :to="'/profile'" class="btn btn-lg btn-primary bg-[#de2a2a]"
          >Cancel</router-link
        >
      </div>
    </div>
  </div>
</template>
