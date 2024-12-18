<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import UserPost from '../components/user-post.vue'
import { usePostStore } from '@/stores/post'

const postStore = usePostStore()
const posts = ref(Object.values(postStore.posts))
const currentPage = ref(1)
const POST_LIMIT = 7
const isLoading = ref(false)
const total = computed(() => {
  return postStore.total
})

const loadPosts = async (force = false) => {
  if ((total.value !== -1 || !force) && total.value < POST_LIMIT * (currentPage.value - 1)) {
    return
  }
  isLoading.value = true
  try {
    const loadedPosts = await postStore.getPosts(
      {
        params: {
          limit: POST_LIMIT,
          page: currentPage.value
        }
      },
      force
    )
    if (!loadedPosts.length) {
      currentPage.value -= 1
    }
  } catch (e) {
    //
  }
  isLoading.value = false
}

onMounted(async () => {
  await loadPosts(true)
  document.getElementsByTagName('main')?.[0]?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.getElementsByTagName('main')?.[0]?.removeEventListener('scroll', handleScroll)
})

watch(postStore.posts, async (val) => {
  posts.value = Object.values(val)
})

function handleScroll(e: any) {
  const bottomOfWindow = e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 30
  if (bottomOfWindow) {
    if (!isLoading.value) {
      currentPage.value += 1
      loadPosts()
    }
  }
}
</script>

<template>
  <div class="main-content-container">
    <!-- jika post belum dibuat -->
    <div class="flex flex-col space-y-5 mt-2" v-if="isLoading && posts.length < 1">
      <div class="h-[100px] w-full bg-gray-200 rounded-lg animate-pulse" />
      <div class="h-[100px] w-full bg-gray-200 rounded-lg animate-pulse" />
      <div class="h-[100px] w-full bg-gray-200 rounded-lg animate-pulse" />
    </div>
    <div v-if="posts.length < 1 && !isLoading" class="flex justify-center lg:space-x-15">
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
          :created_at="post.createdDate"
          :goal_type="post.type"
        ></UserPost>
      </div>
    </div>
    <div
      v-if="isLoading"
      class="py-4 flex items-center justify-center text-center absolute bottom-10 w-full z-[100]"
    >
      <div>Loading...</div>
    </div>
  </div>
</template>
