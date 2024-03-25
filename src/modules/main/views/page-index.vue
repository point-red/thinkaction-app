<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import UserPost from '../components/user-post.vue'
import { useUserStore } from '@/stores/user'
import { usePostStore } from '@/stores/post'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const postStore = usePostStore()
const posts = ref<any>([])
const router = useRouter()

onMounted(async () => {
  if (!localStorage.getItem('token')) {
    router.push('/login')
    return
  }
  posts.value = await postStore.getPosts()
})

watch(postStore.posts, async () => {
  posts.value = await postStore.getPosts()
})
</script>

<template>
  <div class="main-content-container">
    <!-- jika post belum dibuat -->
    <div v-if="posts.length < 1" class="flex justify-center lg:space-x-15">
      <div class="md:mt-[50px] lg:mt-[100px] space-y-5">
        <h1 class="font-extrabold">Welcome to ThinkAction</h1>
        <p>
          Please, create your goals to start this app. <br class="invisible md:visible" />
          In bellow details guideline for create your goals:
        </p>

        <!-- to do -->
        <div class="space-y-5">
          <div class="card p-4 bg-[#FFD5F3]">
            <span>1. Create your resolutions</span>
          </div>
          <div class="card p-4 bg-[#D5FFD6]">
            <span>2. Create your weekly goals</span>
          </div>
          <div class="card p-4 bg-[#E5D5FF]">
            <span>3. Complete your goals</span>
          </div>
        </div>
      </div>
      <img
        src="/goals.png"
        class="w-0 md:w-[400px] lg:w-[600px] invisible md:visible"
        alt="goals image ilustration"
      />
    </div>

    <!-- jika goals sudah dibuat -->
    <div v-if="posts.length > 0">
      <div v-for="post in posts" :key="post._id">
        <UserPost
          :id="post._id"
          :user="post.userInfo"
          :user_id="post.userId"
          :category="post.name"
          :caption="post.caption"
          :photos="post.photo"
          :liked-by-current="post.likedByCurrent"
          :like-count="post.likeCount"
          :comment-count="post.commentCount"
          :date_time="post.date_time"
          :created_at="post.created_at"
          :goal_type="post.goal_type"
        ></UserPost>
      </div>
    </div>
  </div>
</template>
