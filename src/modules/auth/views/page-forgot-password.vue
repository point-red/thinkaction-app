<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from '@/components/index'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const form = ref({
  email: '',
  error: '',
  message: ''
})
const loading = ref(false)

const submit = async () => {
  form.value.error = ''
  form.value.message = ''
  
  if (!form.value.email) {
    form.value.error = 'Email is required'
    return
  }

  loading.value = true
  try {
    const result = await userStore.forgotPassword(form.value.email)
    if (result.success) {
      form.value.message = result.message
      form.value.email = '' // Clear email after successful submission
    } else {
      form.value.error = result.message
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid grid-cols-1 p-12 lg:p-4 md:p-[70px] lg:w-[700px] lg:text-md lg:m-auto">
    <img class="w-[100px] lg:w-[150px] m-auto mb-8" src="/logo.png" alt="ThinkAction Logo" />

    <div class="mb-8 text-left">
      <h2 class="font-bold text-xl lg:text-[28px] lg:mb-4">Forgot Password</h2>
      <p class="text-[grey]">Enter your email address and we'll send you instructions to reset your password.</p>
    </div>

    <form @submit.prevent="submit" method="post" class="space-y-5 text-center">
      <div class="space-y-2">
        <component
          :is="BaseInput"
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
          autocomplete="email"
          class="text-left"
        ></component>
      </div>
      <div v-if="form.error" class="text-red-500">{{ form.error }}</div>
      <div v-if="form.message" class="text-green-500">{{ form.message }}</div>
      <button type="submit" class="btn w-full md:w-[300px] bg-[#3D8AF7] font-bold text-white" :disabled="loading">
        {{ loading ? 'Sending...' : 'Reset Password' }}
      </button>
    </form>

    <div class="flex justify-center my-4 md:my-14 font-bold">
      <router-link to="/login" class="text-[#ff5959]">Back to Sign In</router-link>
    </div>
  </div>
</template>
