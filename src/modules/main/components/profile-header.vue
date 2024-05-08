<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getFile } from '@/lib/connection'

type DefaultProps = {
  is_user: boolean
  isSupporting: boolean
  supporterCount: number
  supportingCount: number
  bio: string
  avatar: string
  goalsPerformance: number
  [key: string]: any
}

const user = withDefaults(defineProps<DefaultProps>(), {
  avatar: '/profile.png',
  is_user: false,
  supporterCount: 0,
  supportingCount: 0,
  goalsPerformance: 0
})

const userStore = useUserStore()
const route = useRoute()

const emit = defineEmits(['support'])

const id = computed(() => {
  return route.params.id ?? userStore.currentUser._id
})
</script>

<template>
  <div class="flex text-center space-x-4">
    <div class="md:w-1/4 w-1/3 mr-4 flex flex-col items-center gap-4">
      <div class="flex flex-col gap-2">
        <img
          :src="user.avatar ? getFile(user.avatar) : '/public/profile.png'"
          class="m-auto w-[75px] h-[75px] md:h-[90px] object-cover md:w-[90px] rounded-full"
        />
        <span class="font-semibold text-xs md:text-base">{{ user.full_name ?? '' }}</span>
      </div>
      <template v-if="!user.is_user">
        <button
          v-if="user.isSupporting"
          @click="emit('support')"
          class="btn bg-slate-400 w-fit mx-auto font-semibold text-white hidden md:block"
        >
          Supporting
        </button>
        <button
          v-else
          @click="emit('support')"
          class="btn bg-[#3D8AF7] w-fit mx-auto font-semibold text-white hidden md:block"
        >
          Support
        </button>
      </template>
    </div>

    <div class="w-full space-y-4 md:space-y-6">
      <!-- goals performance, supporter, supporting -->
      <div class="flex justify-between space-x-3 px-3 md:px-4">
        <div>
          <p class="text-lg">
            {{ (Number.isNaN(user.goalsPerformance) ? 0 : user.goalsPerformance) + '%' }}
          </p>
          <p>Goals Perf.</p>
        </div>
        <router-link :to="{ path: '/user/' + id + '/supporter' }">
          <div>
            <p class="text-lg">{{ user.supporterCount }}</p>
            <p>Supporters</p>
          </div>
        </router-link>
        <router-link :to="{ path: '/user/' + id + '/supporting' }">
          <div>
            <p class="text-lg">{{ user.supportingCount }}</p>
            <p>Supporting</p>
          </div>
        </router-link>
      </div>
      <p class="text-left mt-4">
        {{ user.bio }}
      </p>
    </div>
  </div>
</template>
