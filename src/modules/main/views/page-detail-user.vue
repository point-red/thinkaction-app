<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseProfileHeader from '../components/profile-header.vue'
import BaseResolutionCategory from '../components/profile-resolution-categories.vue'
import BaseUserPost from '../components/user-post.vue'

const user = ref({
  id: 'GhtHVSB12NHGBSGHHg',
  full_name: 'Fitri Andriyani',
  username: 'fitri07',
  avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
  bio: 'nothing to see here',
  is_private: false,
  is_supporting: false,
  goals_performance: 80,
  supporting_count: 100,
  supporter_count: 100
})

const posts = ref({
  resolution_categories: [
    {
      id: 'GhtHVSB12NHGBSGHHg',
      category: 'Finance'
    },
    {
      id: 'GhtHVSB12NHGBSGHHh',
      category: 'Education'
    }
  ],
  posts: [
    {
      id: 'GhtHVSB12NHGBSGHHg',
      user: {
        name: 'Fitri',
        avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL'
      },
      category: 'Finance',
      caption: 'Lorem ipsum dolor sit amet.',
      photos: ['https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL'],
      is_liked: false,
      cheers_count: 20,
      comments_count: 10,
      date_time: '2019-08-24T14:15:22Z'
    },
    {
      id: 'GhtHVSB12NHGBSGHHg',
      user: {
        name: 'Fitri',
        avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL'
      },
      category: 'Education',
      caption: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.',
      photos: [
        'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
        'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL'
      ],
      is_liked: false,
      cheers_count: 20,
      comments_count: 10,
      date_time: '2019-08-24T14:15:22Z'
    }
  ]
})
</script>

<template>
  <div class="main-content-container">
    <!-- PROFILE HEADER -->
    <BaseProfileHeader
      :id="user.id"
      :full_name="user.full_name"
      :username="user.username"
      :avatar="user.avatar"
      :bio="user.bio"
      :is_private="user.is_private"
      :is_supporting="user.is_supporting"
      :goals_performance="user.goals_performance"
      :supporting_count="user.supporting_count"
      :supporter_count="user.supporter_count"
    ></BaseProfileHeader>

    <!-- SUPPORTING BUTTON -->
    <button
      v-if="user.is_supporting == false"
      class="btn bg-[#3D8AF7] w-full font-semibold text-white"
    >
      Support
    </button>
    <button
      v-if="user.is_supporting == true"
      class="btn bg-slate-400 w-full font-semibold text-white"
    >
      Supporting
    </button>

    <!-- RESOLUTIONS -->
    <hr class="border-2" />
    <BaseResolutionCategory
      :resolution_categories="posts.resolution_categories"
    ></BaseResolutionCategory>
    <hr class="border-2" />

    <!-- USER POSTS -->
    <div v-for="post in posts.posts" :key="post.id">
      <router-link :to="{ path: `post/${post.id}` }">
        <BaseUserPost
          :id="post.id"
          :user="post.user"
          :category="post.category"
          :caption="post.caption"
          :photos="post.photos"
          :is_liked="post.is_liked"
          :cheers_count="post.cheers_count"
          :comments_count="post.comments_count"
          :date_time="post.date_time"
        ></BaseUserPost>
      </router-link>
    </div>
  </div>
</template>
