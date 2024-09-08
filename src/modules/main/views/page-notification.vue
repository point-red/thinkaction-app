<script setup lang="ts">
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores/user'
import { getFile } from '@/lib/connection'

const notifications = ref<any>([])

const userStore = useUserStore()
onMounted(async () => {
  notifications.value = await userStore.getNotifications()
})

const accept = async (notification: any) => {
  await userStore.acceptSupporter(notification.fromUserId, notification._id)
  notifications.value = await userStore.getNotifications()
}
const reject = async (notification: any) => {
  await userStore.rejectSupporter(notification.fromUserId, notification._id)
  notifications.value = await userStore.getNotifications()
}
const toggleSupport = async (notification: any) => {
  await userStore.toggleSupport(notification.fromUserId, notification.fromUser?.isSupporting)
  notifications.value = await userStore.getNotifications()
}
</script>

<template>
  <div class="main-content-container">
    <div class="dark:bg-slate-700 bg-white/[50] rounded-md border border-slate-200">
      <div
        v-for="(notif, index) in notifications"
        :key="notif._id"
        class="flex justify-between items-center px-4 py-3 border-slate-200"
        :class="index !== 0 ? 'border-t' : 'border-t-0'"
      >
        <div class="flex flex-row items-center gap-2">
          <img
            v-if="notif.fromUser?.photo"
            class="object-cover w-9 h-9 rounded-full"
            :src="getFile(notif.fromUser?.photo)"
          />
          <div>
            <p class="break-words">{{ notif.message }}</p>
            <time class="text-xs lg:hidden block">{{ dayjs(notif.date).fromNow() }} </time>
          </div>
        </div>
        <div class="flex gap-x-4 items-center h-[30px] justify-end items-end flex-col">
          <div v-if="notif.type === 'request'" class="flex flex-row gap-1.5">
            <button
              @click="() => reject(notif)"
              class="btn btn-xs px-3 py-1.5 font-medium btn-primary bg-secondary"
            >
              Decline
            </button>
            <button
              @click="() => accept(notif)"
              class="btn btn-xs px-3 py-1.5 font-medium btn-primary bg-[#3D8AF7]"
            >
              Accept
            </button>
            <time class="text-xs my-auto hidden lg:block">{{ dayjs(notif.date).fromNow() }} </time>
          </div>
          <div v-else-if="notif.fromUser && !notif.toPostId" class="flex flex-row gap-1.5">
            <button
              v-if="notif.fromUser?.isSupporting"
              @click="() => toggleSupport(notif)"
              class="btn btn-xs px-3 py-1.5 font-medium btn-primary bg-secondary"
            >
              Unsupport
            </button>
            <button
              v-else
              @click="() => toggleSupport(notif)"
              class="btn btn-xs px-3 py-1.5 font-medium btn-primary bg-[#3D8AF7]"
            >
              Support
            </button>
            <time class="text-xs my-auto hidden lg:block">{{ dayjs(notif.date).fromNow() }} </time>
          </div>
          <div v-else-if="notif.toPostId" class="flex flex-row gap-1.5">
            <button
              @click="() => $router.push('/post/' + notif.toPostId)"
              class="btn btn-xs px-3 py-1.5 font-medium bg-white border border-gray-300"
            >
              View Post
            </button>
            <time class="text-xs my-auto hidden lg:block">{{ dayjs(notif.date).fromNow() }} </time>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
