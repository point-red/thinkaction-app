<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, computed, watch } from 'vue'
import { BaseTextarea } from '@/components/index'
import CommentAction from '@/modules/main/components/comment-action.vue'
import { getFile } from '@/lib/connection'
import { useCommentStore } from '@/stores/comment'

export interface Props {
  id?: string
  full_name?: string
  avatar?: string
  date_time?: string
  comment?: string
  replyCount?: number
  postId: string
  postUserId: string
  userId: string
  refetchCount: number
}

const props = withDefaults(defineProps<Props>(), {
  avatar: undefined,
  replyCount: 0
})

const emit = defineEmits(['reply', 'delete'])
const replies = ref<any>([])
const commentStore = useCommentStore()

const text = ref('')

let showTextarea = ref(false)
let showReplies = ref(false)
const repliesFetched = ref(false)
const count = ref(0)

const sendComment = async function () {
  if (text.value) {
    emit('reply', {
      comment: text.value
    })
    showTextarea.value = false
    showReplies.value = true
    text.value = ''
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
const allCount = computed(() => {
  return count.value + props.replyCount
})

const refreshComments = (id: string, type: string) => {
  if (type === 'comment') {
    emit('delete', id)
  } else if (type === 'reply') {
    count.value -= 1
    replies.value = replies.value.filter((r: any) => r._id !== id)
    emit('delete')
  }
}

watch(
  () => props.refetchCount,
  async () => {
    repliesFetched.value = false
    await fetchReplies()
  }
)
</script>

<template>
  <div class="p-3 rounded-lg">
    <!-- PARENT -->
    <div>
      <!-- user info -->
      <div class="flex flex-row items-center w-full">
        <div class="flex gap-2 items-center mb-2">
          <router-link :to="{ path: '/user/' + props.userId }">
            <img
              :src="props.avatar ? getFile(props.avatar) : '/profile.png'"
              alt="user-photo"
              class="object-cover w-10 h-10 bg-slate-300 rounded-[1000px]"
            />
          </router-link>
          <div>
            <p class="font-semibold text-sm">{{ props.full_name }}</p>
            <!-- <p>{{ dayjs(props.date_time).format('DD/MM/YYYY HH:mm') }}</p> -->
            <time class="text-xs">{{ dayjs(props.date_time).fromNow() }}</time>
          </div>
        </div>
        <CommentAction
          :id="props.id!"
          :post-user-id="postUserId"
          :user-id="userId"
          :post-id="postId"
          @delete="() => refreshComments(props.id!, 'comment')"
        />
      </div>

      <!-- caption -->
      <span>{{ props.comment }}</span>

      <div class="flex justify-between my-2">
        <button @click="showTextarea = !showTextarea" class="text-blue-500 underline">Reply</button>
        <button @click="toggleReplies()" v-if="allCount > 0" class="text-blue-500 underline">
          {{ !showReplies ? 'See ' + allCount + ' replies' : 'Hide replies' }}
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
        <div class="flex flex-row items-center">
          <div class="flex items-center gap-2 mb-2">
            <router-link :to="{ path: '/user/' + getUserInfo(reply)?._id }">
              <img
                :src="
                  getUserInfo(reply)?.photo ? getFile(getUserInfo(reply)?.photo) : '/profile.png'
                "
                alt="user-photo"
                class="w-10 h-10 object-cover bg-slate-300 rounded-[1000px]"
              />
            </router-link>
            <div>
              <p class="font-semibold text-sm">
                {{ getUserInfo(reply).fullname ?? getUserInfo(reply).username }}
              </p>
              <time class="text-xs">{{ dayjs(reply.createdDate).fromNow() }}</time>
            </div>
          </div>
          <CommentAction
            :id="reply?._id"
            :post-user-id="postUserId"
            :user-id="reply?.userId"
            :post-id="postId"
            @delete="() => refreshComments(reply?._id, 'reply')"
          />
        </div>

        <!-- caption -->
        <span>{{ reply.message }}</span>
      </div>
    </div>
  </div>
</template>
