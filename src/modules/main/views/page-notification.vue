<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

const notifications = ref([
  {
    id: 'GhtHVSB12NHGBSGHHg',
    body: 'Ani request to support you',
    type: 'approval',
    applicant_id: 'GhtHVSB12NHGBSGHHH',
    created_at: '2023-06-29T13:45:06.740Z'
  },
  {
    id: 'GhtHVSB12NHGBSGHHH',
    body: 'Ani commented on your goal',
    type: 'system',
    created_at: '2023-06-23T13:45:06.740Z'
  },
  {
    id: 'GhtHVSB12NHGBSGHHI',
    body: 'Ani cheered on your goal',
    type: 'system',
    created_at: '2023-06-24T13:33:06.740Z'
  }
])
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
        <div>
          <p class="break-words">{{ notif.body }}</p>
          <time class="text-xs lg:hidden block">{{ dayjs(notif.created_at).fromNow() }} </time>
        </div>
        <div class="flex gap-x-4 items-center h-[30px] justify-end items-end flex-col">
          <div v-if="notif.type === 'approval'" class="flex flex-row gap-1.5">
            <button class="btn btn-xs px-3 py-1.5 font-medium btn-primary bg-secondary">
              Decline
            </button>
            <button class="btn btn-xs px-3 py-1.5 font-medium btn-primary bg-[#3D8AF7]">
              Accept
            </button>
            <time class="text-xs my-auto hidden lg:block"
              >{{ dayjs(notif.created_at).fromNow() }}
            </time>
          </div>
          <div v-else class=""></div>
        </div>
      </div>
    </div>
  </div>
</template>
