<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import { BaseTextarea } from '@/components/index'
import { getFile } from '@/lib/connection'
import { useCommentStore } from '@/stores/comment'

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
  replyCount?: number
  postId: string
}

const props = withDefaults(defineProps<Props>(), {
  avatar: undefined,
  replyCount: 0
})

const emit = defineEmits(['reply'])
const replies = ref<any>([])
const commentStore = useCommentStore()

const text = ref('')

let showTextarea = ref(false)
let showReplies = ref(false)
const repliesFetched = ref(false)

const sendComment = async function () {
  if (text.value) {
    emit('reply', {
      comment: text.value
    })
    showTextarea.value = false
    showReplies.value = true
    text.value = ''
    repliesFetched.value = false
    await fetchReplies()
  }
}

const getUserInfo = (reply: any) => {
  return reply.userInfo?.[0] ?? reply.userInfo ?? {}
}

const fetchReplies = async () => {
  if (!repliesFetched.value) {
    const comments = await commentStore.getComments(props.postId, { commentId: props.id })
    replies.value = comments
    repliesFetched.value = true
  }
}
const toggleReplies = async () => {
  showReplies.value = !showReplies.value
  await fetchReplies()
}
</script>

<template>
  <div class="p-3 rounded-lg">
    <!-- PARENT -->
    <div>
      <!-- user info -->
      <div class="flex gap-2 items-center mb-2">
        <img
          :src="props.avatar ? getFile(props.avatar) : '/profile.png'"
          alt="user-photo"
          class="object-cover w-14 h-14 bg-slate-300 rounded-[1000px]"
        />
        <div>
          <p class="font-bold">{{ props.full_name }}</p>
          <!-- <p>{{ dayjs(props.date_time).format('DD/MM/YYYY HH:mm') }}</p> -->
          <p>{{ dayjs(props.date_time).fromNow() }}</p>
        </div>
      </div>

      <!-- caption -->
      <span>{{ props.comment }}</span>

      <div class="flex justify-between my-2">
        <button @click="showTextarea = !showTextarea" class="text-blue-500 underline">Reply</button>
        <button @click="toggleReplies()" v-if="replyCount > 0" class="text-blue-500 underline">
          {{ !showReplies ? 'See ' + replyCount + ' replies' : 'Hide replies' }}
        </button>
      </div>

      <!-- TEXTAREA -->
      <div v-if="showTextarea" class="mb-4">
        <component :is="BaseTextarea" v-model="text" border="full" class="mb-2"></component>
        <button @click="sendComment()" class="btn btn-primary bg-[#3D8AF7]">KIRIM</button>
      </div>
    </div>

    <!-- REPLIES -->
    <div v-for="reply in replies" :key="reply._id" class="ml-10 mb-4">
      <div v-if="showReplies">
        <!-- user info -->
        <div class="flex items-center gap-2 mb-2">
          <img
            :src="getUserInfo(reply)?.photo ? getFile(getUserInfo(reply)?.photo) : '/profile.png'"
            alt="user-photo"
            class="w-14 h-14 object-cover bg-slate-300 rounded-[1000px]"
          />
          <div>
            <p class="font-bold">
              {{ getUserInfo(reply).fullname ?? getUserInfo(reply).username }}
            </p>
            <p>{{ dayjs(getUserInfo(reply).createdAt).fromNow() }}</p>
          </div>
        </div>

        <!-- caption -->
        <span>{{ reply.message }}</span>
      </div>
    </div>
  </div>
</template>
