<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BaseInput } from '@/components/index'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const form = ref({
  password: '',
  confirm_password: '',
  error: '',
  message: ''
})

const loading = ref(false)
const tokenValid = ref(false)

onMounted(async () => {
  const token = route.params.token as string
  if (!token) {
    router.push('/login')
    return
  }

  const result = await userStore.verifyResetToken(token)
  if (!result?.success) {
    form.value.error = result?.message || 'Invalid reset token'
    return
  }
  tokenValid.value = true
})

const resetPassword = async () => {
  form.value.error = ''
  form.value.message = ''
  
  if (!form.value.password) {
    form.value.error = 'Password is required'
    return
  }
  
  if (form.value.password.length < 8) {
    form.value.error = 'Password must be at least 8 characters'
    return
  }

  if (form.value.password !== form.value.confirm_password) {
    form.value.error = 'Passwords do not match'
    return
  }

  loading.value = true
  try {
    const result = await userStore.resetPassword(route.params.token as string, form.value.password)
    if (result?.success) {
      form.value.message = result?.message || 'Password reset successful'
      form.value.error = ''
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      form.value.message = ''
      form.value.error = result?.message || 'Failed to reset password'
    }
  } catch (error: any) {
    form.value.error = error?.message || 'An error occurred'
    form.value.message = ''
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid grid-cols-1 p-12 lg:p-4 md:p-[70px] lg:w-[700px] lg:text-md lg:m-auto">
    <img class="w-[100px] lg:w-[150px] m-auto mb-8" src="/logo.png" alt="ThinkAction Logo" />

    <div class="mb-8 text-left">
      <h2 class="font-bold text-xl lg:text-[28px] lg:mb-4">Reset Password</h2>
      <p class="text-[grey]" v-if="tokenValid">Enter your new password below</p>
      <p class="text-[grey]" v-else>Verifying reset link...</p>
    </div>

    <form v-if="tokenValid" @submit.prevent="resetPassword" method="post" class="space-y-5 text-center">
      <div class="space-y-2">
        <component
          :is="BaseInput"
          v-model="form.password"
          label="New Password"
          type="password"
          autocomplete="new-password"
          class="text-left"
        ></component>
        <component
          :is="BaseInput"
          v-model="form.confirm_password"
          label="Confirm New Password"
          type="password"
          autocomplete="new-password"
          class="text-left"
        ></component>
      </div>
      <div v-if="form.error" class="text-red-500">{{ form.error }}</div>
      <div v-if="form.message" class="text-green-500">{{ form.message }}</div>
      <button type="submit" class="btn w-full md:w-[300px] bg-[#3D8AF7] font-bold text-white" :disabled="loading">
        {{ loading ? 'Updating...' : 'Update Password' }}
      </button>
    </form>

    <div v-if="!tokenValid && form.error" class="text-center">
      <div class="text-red-500 mb-4">{{ form.error }}</div>
      <router-link to="/forgot-password" class="text-[#ff5959] font-bold">Request a new reset link</router-link>
    </div>
  </div>
</template>