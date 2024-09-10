<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserPost from '../components/user-post.vue'
import PostComment from '../components/post-comment.vue'
import { useRoute } from 'vue-router'
import { BaseTextarea } from '@/components'
import { usePostStore } from '@/stores/post'
import { useCommentStore } from '@/stores/comment'

const { id: postId } = useRoute().params
const commentStore = useCommentStore()
const postStore = usePostStore()
const post = ref<any>(null)
const comments = ref<any>([])
const text = ref('')
const refetchCounts = ref({})

const sendReply = async function ({ comment }: any, commentId?: string) {
  text.value = ''
  await commentStore.postComment(postId as string, comment, commentId ? { commentId } : {})
  if (!commentId) {
    comments.value = await commentStore.getComments(postId as string, {}, true)
  }
  post.value = postStore.addComment(postId as string)
  refetchCounts.value[commentId] = (refetchCounts.value[commentId] ?? 0) + 1
}

onMounted(async () => {
  post.value = await postStore.getPostById(postId as string)
  comments.value = await commentStore.getComments(postId as string, {}, true)
})

const getUserInfo = (comment: any) => {
  return comment?.userInfo?.[0] ?? comment?.userInfo ?? {}
}

const deleteComment = (id?: string) => {
  if (id) {
    comments.value = comments.value.filter((c) => c._id !== id)
  }
  post.value = postStore.removeComment(postId as string)
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
    <div class="flex flex-row gap-1 items-end md:max-w-[600px] md:mx-auto">
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
      class="bg-white border border-slate-200 rounded-lg md:max-w-[600px] md:mx-auto"
    >
      <PostComment
        :id="comment._id"
        :full_name="getUserInfo(comment).fullname ?? getUserInfo(comment).username"
        :user-id="getUserInfo(comment)._id"
        :avatar="getUserInfo(comment).photo"
        :post-user-id="(post.userId as string)"
        :date_time="comment.createdDate"
        :post-id="(postId as string)"
        :reply-count="comment.replyCount"
        :comment="comment.message"
        :replies="comment.replies ?? []"
        :refetch-count="refetchCounts[comment._id] ?? 0"
        @reply="sendReply($event, comment._id)"
        @delete="deleteComment"
      ></PostComment>
    </div>
  </div>
</template>
