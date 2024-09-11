<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BaseInput } from '@/components/index'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const form = ref<any>({
  email: '',
  username: '',
  fullname: '',
  password: '',
  confirm_password: '',
  errors: ''
})
const showErrors = ref(false)

const register = async function () {
  showErrors.value = false
  if (!form.value.email || !form.value.password || !form.value.fullname) {
    showErrors.value = true
    return
  }
  if (form.value.confirm_password !== form.value.password) {
    showErrors.value = true
    return
  }
  if (form.value.password.length < 8) {
    showErrors.value = true
    return
  }
  form.value.errors = ''
  const loggedIn = await userStore.register(form.value)
  if (loggedIn === true) {
    router.push('/')
    return
  } else if (loggedIn?.errors) {
    form.value.errors = loggedIn.errors
  }
}

const callback = async (response: any) => {
  // This callback will be triggered when the user selects or register to
  // his Google account from the popup
  const loggedIn = await userStore.oauthLogin(response)
  if (loggedIn) {
    router.push('/')
  }
}

onMounted(async () => {
  await userStore.logout()
})
</script>

<template>
  <div class="grid grid-cols-1 p-12 lg:p-4 md:p-[70px] lg:w-[700px] lg:text-md lg:m-auto">
    <img class="w-[100px] lg:w-[150px] m-auto mb-8" src="/logo.png" alt="" />

    <div class="mb-8 text-left">
      <h2 class="font-bold text-xl lg:text-[28px] lg:mb-4">Sign Up</h2>
      <p class="text-[grey]">Hi there! Nice to see you again</p>
    </div>

    <form @submit.prevent="register" method="post" class="space-y-5 text-center">
      <div class="space-y-2">
        <component
          :is="BaseInput"
          v-model="form.fullname"
          label="Full Name"
          :error="showErrors && !form.fullname ? 'fullname is required' : ''"
          type="text"
          placeholder="ex. John Doe"
          helper=""
          autocomplete
          class="text-left"
        ></component>
        <component
          :is="BaseInput"
          v-model="form.username"
          :error="showErrors && !form.username ? 'username is required' : ''"
          label="Username"
          type="text"
          placeholder="Choose a unique username"
          helper=""
          autocomplete
          class="text-left"
        ></component>
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
          label="Password"
          type="password"
          :error="
            showErrors && form.password.length < 8 ? 'Password must have at least 8 characters' : ''
          "
          autocomplete
          class="text-left"
        >
        </component>
        <component
          :is="BaseInput"
          v-model="form.confirm_password"
          label="Confirm Password"
          type="password"
          :error="
            showErrors && form.confirm_password !== form.password
              ? 'Confirm password doesn\'t match'
              : ''
          "
          autocomplete
          class="text-left"
        >
        </component>
      </div>
      <div class="text-red-500">{{ form.errors }}</div>
      <button class="btn w-full md:w-[300px] bg-[#3D8AF7] font-bold text-white">Sign Up</button>
    </form>

    <p class="text-slate text-center my-4 font-semibold">or use one of your social profiles</p>

    <div class="md:mx-auto flex flex-col">
      <GoogleLogin :callback="callback" prompt>
        <button
          type="button"
          class="btn w-full md:w-[300px] m-auto bg-[#F960D9] font-bold text-white"
        >
          <img class="w-[30px] lg:w-[30px] pr-2" src="@/assets/images/google.png" />
          Google
        </button>
      </GoogleLogin>
    </div>
    <!-- <button @click="register" class="btn w-full md:w-[300px] m-auto bg-[#F960D9] font-bold text-white">
      <img class="w-[30px] lg:w-[30px] pr-2" src="@/assets/images/google.png" />
      Google
    </button> -->

    <div class="flex justify-between my-4 md:my-14 font-bold">
      <p class="text-slate font-semibold">Already have an account?</p>
      <router-link to="/login" class="text-[#ff5959]">Sign In</router-link>
    </div>
  </div>
</template>
