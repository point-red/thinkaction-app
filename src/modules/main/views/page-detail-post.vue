<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import UserPost from '../components/user-post.vue'
import PostComment from '../components/post-comment.vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { BaseTextarea } from '@/components'
import { usePostStore } from '@/stores/post'
import { useCommentStore } from '@/stores/comment'
import { watch } from 'fs'

const { id: postId } = useRoute().params
const store = useUserStore()
const commentStore = useCommentStore()
const postStore = usePostStore()
const post = ref<any>(null)
const comments = ref<any>([])
const text = ref('')

const sendReply = async function ({ comment }: any, commentId?: string) {
  text.value = ''
  await commentStore.postComment(postId as string, comment, commentId ? { commentId } : {})
  if (!commentId) {
    comments.value = await commentStore.getComments(postId as string, {}, true)
  }
  post.value = postStore.addComment(postId as string)
}

onMounted(async () => {
  post.value = await postStore.getPostById(postId as string)
  comments.value = await commentStore.getComments(postId as string, {}, true)
})

const getUserInfo = (comment: any) => {
  return comment?.userInfo?.[0] ?? comment?.userInfo ?? {}
}
</script>

<template>
  <div class="main-content-container">
    <!-- USER POSTS -->
    <UserPost
      v-if="post"
      :id="post._id"
      :user="post.userInfo"
      :user_id="post.userId"
      :category="post.categoryName"
      :caption="post.caption"
      :photos="post.photo"
      :liked-by-current="post.likedByCurrent"
      :like-count="post.likeCount"
      :comment-count="post.commentCount"
      :date_time="post.date_time"
      :created_at="post.createdDate"
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
      :key="comment._id"
      class="bg-white border border-slate-200 rounded-lg"
    >
      <PostComment
        :id="comment._id"
        :full_name="getUserInfo(comment).fullname ?? getUserInfo(comment).username"
        :user-id="getUserInfo(comment)._id"
        :avatar="getUserInfo(comment).photo"
        :date_time="comment.createdDate"
        :post-id="(postId as string)"
        :reply-count="comment.replyCount"
        :comment="comment.message"
        :replies="comment.replies ?? []"
        @reply="sendReply($event, comment._id)"
      ></PostComment>
    </div>
  </div>
</template>
