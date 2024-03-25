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
const emit = defineEmits(['update'])
const currentUser = computed(() => userStore.currentUser)
// TODO: Add async functions
const supportUser = async function () {
  const data = await userStore.toggleSupport((props.item as any)._id, props.item.isSupporting)
  emit('update', {
    ...props.item,
    ...data
  })
}
</script>
<template>
  <router-link :to="{ path: `/user/${item._id}` }">
    <UserSneakpeak
      :id="item._id"
      :fullname="item.fullname"
      :username="item.username"
      :avatar="item.photo"
      :supporter="item.supporters"
    ></UserSneakpeak>
  </router-link>
  <div v-if="item._id !== userStore.currentUser._id" class="flex space-x-2">
    <button
      v-if="item.isSupporting"
      @click="supportUser"
      class="bg-slate-400 h-[40px] rounded-lg mt-6 px-3 text-white font-semibold"
    >
      Supporting
    </button>
    <button
      v-if="!item.isSupporting"
      @click="supportUser"
      class="bg-[#3D8AF7] h-[40px] rounded-lg mt-6 px-6 text-white font-semibold"
    >
      Support
    </button>
    <button
      v-if="type === 'supporter' && id === currentUser?._id"
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
