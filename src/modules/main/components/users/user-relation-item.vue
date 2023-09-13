<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'
import UserSneakpeak from '../user-sneakpeak.vue'

type Props = {
  item: any
  type: string
  id: string
}

const userStore = useUserStore()
const props = withDefaults(defineProps<Props>(), {
  item: {}
})
const currentUser = computed(() => userStore.currentUser)
const isSupporting = computed(() => userStore.isSupporting(props.item.id))
// TODO: Add async functions
const supportUser = function () {
  userStore.toggleSupport((props.item as any).id)
}
// onMounted(() => {
//   isSupporting.value = userStore.isSupporting((props.user as any).id)
// })
</script>
<template>
  <router-link :to="{ path: `/user/${item.id}` }">
    <UserSneakpeak
      :id="item.id"
      :fullname="item.full_name"
      :username="item.username"
      :avatar="item.avatar"
      :supporter="item.supporter"
    ></UserSneakpeak>
  </router-link>
  <div v-if="item.id !== userStore.currentUser.id" class="flex space-x-2">
    <button
      v-if="isSupporting"
      @click="supportUser"
      class="bg-slate-400 h-[40px] rounded-lg mt-6 px-3 text-white font-semibold"
    >
      Supporting
    </button>
    <button
      v-if="!isSupporting"
      @click="supportUser"
      class="bg-[#3D8AF7] h-[40px] rounded-lg mt-6 px-6 text-white font-semibold"
    >
      Support
    </button>
    <button
      v-if="type === 'supporters' && id === currentUser?.id"
      class="bg-slate-400 h-[40px] rounded-lg mt-6 px-3 text-white font-semibold"
    >
      Remove
    </button>
  </div>
  <div v-else class="flex space-x-2">
    <router-link
      :to="{ path: '/profile' }"
      class="bg-white border-2 border-gray-600 text-gray-600 flex items-center justify-center h-[40px] rounded-lg mt-6 px-6 font-semibold"
    >
      Profile
    </router-link>
  </div>
</template>
