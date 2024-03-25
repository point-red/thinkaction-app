<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from '@/components/index'
import UserSneakpeak from '../components/user-sneakpeak.vue'
import client from '@/lib/connection'
import { watchDebounced } from '@vueuse/core'
import { useRoute } from 'vue-router'

const supporters = ref<any>([])
const route = useRoute()

const form = ref({
  key: ''
})

watchDebounced(
  () => form.value.key,
  async () => {
    const {
      data: { data }
    } = await client().get(
      `/users/${route.params.id}/supporting?username=${form.value.key}&page=1&limit=10`
    )
    supporters.value = data
  }
)
</script>

<template>
  <div class="main-content-container">
    <!-- SEARCH -->
    <component
      :is="BaseInput"
      v-model="form.key"
      placeholder="Cari pengguna"
      class="border-1 border-slate rounded-lg"
    >
    </component>

    <!-- LIST SUPPORTER -->
    <div class="flex justify-between" v-for="supporter in supporters" :key="supporter._id">
      <router-link :to="{ path: `user/${supporter._id}` }">
        <UserSneakpeak
          :id="supporter._id"
          :fullname="supporter.fullname"
          :username="supporter.username"
          :avatar="supporter.photo"
          :supporter="supporter.supporters"
        ></UserSneakpeak>
      </router-link>
      <button
        v-if="supporter.is_supporting == true"
        class="bg-slate-400 h-[40px] rounded-lg mt-6 px-3 text-white font-semibold"
      >
        Supporting
      </button>
    </div>
  </div>
</template>
