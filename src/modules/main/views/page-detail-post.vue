<script setup lang="ts">
import { ref, computed } from 'vue'
import UserPost from '../components/user-post.vue'
import PostComment from '../components/post-comment.vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { BaseTextarea } from '@/components'

const { id: postId } = useRoute().params
const store = useUserStore()
const post = store.userGoals.find((f) => f.id === postId)
let comments = computed(() => store.getCommentsByGoalId(postId as string))
const text = ref('')

const sendReply = function ({ comment }: any, comment_id?: string) {
  text.value = ''
  store.addCommentToGoal(postId as string, comment, comment_id)
}
</script>

<template>
  <div class="main-content-container">
    <!-- USER POSTS -->
    <UserPost
      v-if="post"
      :id="post.id"
      :user="post.user"
      :category="post.category"
      :caption="post.caption"
      :photos="post.photos"
      :is_liked="post.is_liked_by_user"
      :cheers_count="post.cheers_count"
      :comments_count="post.comments_count"
      :date_time="post.date_time"
      :created_at="post.created_at"
    ></UserPost>
    <div class="flex flex-row gap-1 items-end">
      <div class="flex-grow">
        <component
          :is="BaseTextarea"
          v-model="text"
          placeholder="Leave a comment"
          border="full"
        ></component>
      </div>

      <button
        @click="sendReply({ comment: text })"
        class="btn btn-xs py-3 btn-primary bg-[#3D8AF7]"
      >
        KIRIM
      </button>
    </div>

    <div
      v-for="comment in comments"
      :key="comment.comment_id"
      class="bg-white border border-slate-200 rounded-lg"
    >
      <PostComment
        :id="comment.comment_id"
        :full_name="comment.full_name"
        :avatar="comment.avatar"
        :date_time="comment.date_time"
        :comment="comment.comment"
        :replies="comment.replies"
        @reply="sendReply($event, comment.comment_id)"
      ></PostComment>
    </div>
  </div>
</template>
