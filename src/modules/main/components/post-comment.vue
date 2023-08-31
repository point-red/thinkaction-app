<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import { BaseTextarea } from '@/components/index'
import moment from 'moment'

type Reply = {
  [key: string]: any
  id: string
  full_name: string
  avatar: string
  date_time: string
  comment: string
}

export interface Props {
  id?: string
  full_name?: string
  avatar?: string
  date_time?: string
  comment?: string
  replies?: Array<Reply>
}

const props = withDefaults(defineProps<Props>(), {
  avatar: '/profile.png'
})

const emit = defineEmits(['reply'])

const text = ref('')

let showTextarea = ref(false)
let showReplies = ref(false)

const sendComment = function () {
  if (text.value) {
    emit('reply', {
      comment: text
    })
    showTextarea.value = false
    showReplies.value = true
  }
}
</script>

<template>
  <div class="p-3 rounded-lg">
    <!-- PARENT -->
    <div>
      <!-- user info -->
      <div class="flex gap-2 items-center">
        <img :src="props.avatar" alt="user-photo" class="w-16 h-16 bg-slate-300 rounded-[1000px]" />
        <div>
          <p class="font-bold">{{ props.full_name }}</p>
          <p>{{ dayjs(props.date_time).format('DD/MM/YYYY HH:mm') }}</p>
        </div>
      </div>

      <!-- caption -->
      <span>{{ props.comment }}</span>

      <div class="flex justify-between my-2">
        <button @click="showTextarea = !showTextarea" class="text-blue-500 underline">Reply</button>
        <button
          @click="showReplies = !showReplies"
          v-if="props.replies && props.replies.length != 0"
          class="text-blue-500 underline"
        >
          {{ !showReplies ? 'See ' + props.replies.length + ' replies' : 'Hide replies' }}
        </button>
      </div>

      <!-- TEXTAREA -->
      <div v-if="showTextarea" class="mb-4">
        <component :is="BaseTextarea" v-model="text" border="full" class="mb-2"></component>
        <button @click="sendComment()" class="btn btn-primary bg-[#3D8AF7]">KIRIM</button>
      </div>
    </div>

    <!-- REPLIES -->
    <div v-for="reply in props.replies" :key="reply.id" class="ml-10 mb-4">
      <div v-if="showReplies">
        <!-- user info -->
        <div class="flex items-center gap-2">
          <img
            :src="reply.avatar"
            alt="user-photo"
            class="w-16 h-16 bg-slate-300 rounded-[1000px]"
          />
          <div>
            <p class="font-bold">{{ reply.full_name }}</p>
            <p>{{ moment(reply.date_time).fromNow() }}</p>
          </div>
        </div>

        <!-- caption -->
        <span>{{ reply.comment }}</span>
      </div>
    </div>
  </div>
</template>
