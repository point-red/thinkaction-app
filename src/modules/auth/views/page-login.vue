<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BaseInput } from '@/components/index'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const form = ref<any>({
  email: '',
  password: '',
  errors: ''
})
const showErrors = ref(false)

const login = async function () {
  showErrors.value = false
  if (!form.value.email || !form.value.password) {
    showErrors.value = true
    return
  }
  form.value.errors = ''
  const loggedIn = await userStore.login(form.value)
  if (loggedIn === true) {
    router.push('/')
    return
  } else if (loggedIn?.errors) {
    form.value.errors = loggedIn.errors
  }
}

// const callback = async (response: any) => {
//   // This callback will be triggered when the user selects or login to
//   // his Google account from the popup
//   const loggedIn = await userStore.oauthLogin(response)
//   if (loggedIn) {
//     router.push('/')
//   }
// }

onMounted(async () => {
  await userStore.logout()
})
</script>

<template>
  <div class="grid grid-cols-1 p-12 lg:p-4 md:p-[70px] lg:w-[700px] lg:text-md lg:m-auto">
    <img class="w-[100px] lg:w-[150px] m-auto mb-8" src="/logo.png" alt="" />

    <div class="mb-8 text-left">
      <h2 class="font-bold text-xl lg:text-[28px] lg:mb-4">Sign In</h2>
      <p class="text-[grey]">Hi there! Nice to see you again</p>
    </div>

    <form @submit.prevent="login" method="post" class="space-y-5 text-center">
      <div class="space-y-2">
        <component
          :is="BaseInput"
          v-model="form.email"
          :error="showErrors && !form.email ? 'email is required' : ''"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
          helper=""
          autocomplete
          class="text-left"
        ></component>
        <component
          :is="BaseInput"
          v-model="form.password"
          :error="showErrors && !form.password ? 'password is required' : ''"
          label="Password"
          type="password"
          autocomplete
          class="text-left"
        >
        </component>
      </div>
      <div class="text-red-500">{{ form.errors }}</div>
      <button class="btn w-full md:w-[300px] bg-[#3D8AF7] font-bold text-white">Sign In</button>
    </form>

    <p class="text-slate text-center my-4 font-semibold">or use one of your social profiles</p>

    <div class="md:mx-auto flex flex-col">
      <!-- <GoogleLogin :callback="callback" prompt>
        <button
          type="button"
          class="btn w-full md:w-[300px] m-auto bg-[#F960D9] font-bold text-white"
        >
          <img class="w-[30px] lg:w-[30px] pr-2" src="@/assets/images/google.png" />
          Google
        </button>
      </GoogleLogin> -->
    </div>
    <!-- <button @click="login" class="btn w-full md:w-[300px] m-auto bg-[#F960D9] font-bold text-white">
      <img class="w-[30px] lg:w-[30px] pr-2" src="@/assets/images/google.png" />
      Google
    </button> -->

    <div class="flex justify-between my-4 md:my-14 font-bold">
      <a href="" class="text-slate font-semibold">Forgot password?</a>
      <router-link to="/register" class="text-[#ff5959]">Sign Up</router-link>
    </div>
  </div>
</template>
