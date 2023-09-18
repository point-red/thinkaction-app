<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from '@/components/index'
import { uuid } from '@/modules/data/users'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  email: '',
  password: ''
})

const login = function () {
  localStorage.setItem('token', uuid())
  router.push('/')
}
</script>

<template>
  <div class="grid grid-cols-1 p-12 lg:p-4 md:p-[70px] lg:w-[700px] lg:text-md lg:m-auto">
    <img class="w-[100px] lg:w-[150px] m-auto mb-8" src="/logo.png" alt="" />

    <div class="mb-8 text-left">
      <h2 class="font-bold text-xl lg:text-[28px] lg:mb-4">Sign In</h2>
      <p class="text-[grey]">Hi there! Nice to see you again</p>
    </div>

    <form action="" @submit="login" method="post" class="space-y-5 text-center">
      <div class="space-y-2">
        <component
          :is="BaseInput"
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
          helper=""
          class="text-left"
        ></component>
        <component
          :is="BaseInput"
          v-model="form.password"
          label="Password"
          type="password"
          error=""
          class="text-left"
        ></component>
      </div>
      <button class="btn w-full md:w-[300px] bg-[#3D8AF7] font-bold text-white">Sign In</button>
    </form>

    <p class="text-slate text-center my-4 font-semibold">or use one of your social profiles</p>

    <button @click="login" class="btn w-full md:w-[300px] m-auto bg-[#F960D9] font-bold text-white">
      <img class="w-[30px] lg:w-[30px] pr-2" src="@/assets/images/google.png" />
      Google
    </button>

    <div class="flex justify-between my-4 md:my-14 font-bold">
      <a href="" class="text-slate font-semibold">Forgot password?</a>
      <a href="" class="text-[#ff5959]">Sign Up</a>
    </div>
  </div>
</template>
