<script setup lang="ts">
import { ref } from 'vue'
import UserPost from '../components/user-post.vue'

const posts = ref([
  {
    id: 'GhtHVSB12NHGBSGHHt',
    user: {
      name: 'Fitri',
      avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL'
    },
    category: 'Finance',
    caption: 'Lorem ipsum dolor sit amet.',
    photos: [
      'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
      'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL'
    ],
    is_liked: false,
    cheers_count: 20,
    comments_count: 10,
    date_time: '2019-08-24T14:15:22Z'
  },
  {
    id: 'GhtHVSB12NHGBSGHHg',
    user: {
      name: 'Fitri A',
      avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL'
    },
    category: 'Finance',
    caption: 'Lorem ipsum dolor sit amet.',
    photos: ['https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL'],
    is_liked: false,
    cheers_count: 20,
    comments_count: 10,
    date_time: '2019-08-24T14:15:22Z'
  }
])
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
      <div v-for="post in posts" :key="post.id">
        <router-link :to="{ path: `post/${post.id}` }">
          <UserPost
            :id="post.id"
            :user="post.user"
            :category="post.category"
            :caption="post.caption"
            :photos="post.photos"
            :is_liked="post.is_liked"
            :cheers_count="post.cheers_count"
            :comments_count="post.comments_count"
            :date_time="post.date_time"
          ></UserPost>
        </router-link>
      </div>
    </div>
  </div>
</template>
