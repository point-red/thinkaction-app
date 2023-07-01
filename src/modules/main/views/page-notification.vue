<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment'

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
  }
])
</script>

<template>
  <div class="main-content-container">
    <div v-for="notif in notifications" :key="notif.id" class="flex justify-between">
      <p>{{ notif.body }}</p>
      <div class="flex space-x-3">
        <button v-if="notif.type === 'approval'" class="btn btn-primary h-[35px] bg-[#3D8AF7]">
          Accept
        </button>
        <p>{{ moment(notif.created_at).fromNow() }}</p>
      </div>
    </div>
  </div>
</template>
