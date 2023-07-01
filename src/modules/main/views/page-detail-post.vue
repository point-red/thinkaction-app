<script setup lang="ts">
import { ref } from 'vue'
import UserPost from '../components/user-post.vue'
import PostComment from '../components/post-comment.vue'

const post = ref({
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
  date_time: '2019-08-24T14:15:22Z',
  comments: [
    {
      id: 'GhtHVSB12NHGBSGHtg',
      fullname: 'Fitri Andriyani',
      avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
      date_time: '2019-08-24T14:15:22Z',
      comment:
        'lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
      replies: [
        {
          id: 'GhtHVSB12NHGBSGHgg',
          fullname: 'Jeno',
          avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
          date_time: '2019-08-24T14:15:22Z',
          comment:
            'lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet'
        },
        {
          id: 'GhtHVSB12NHGBSGHww',
          fullname: 'Jaemin',
          avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
          date_time: '2019-08-24T14:15:22Z',
          comment:
            'lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet'
        }
      ]
    },
    {
      id: 'GhtHVSB12NHGBSGHtg',
      fullname: 'Fadil',
      avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
      date_time: '2019-08-24T14:15:22Z',
      comment:
        'lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
      replies: []
    }
  ]
})
</script>

<template>
  <div class="main-content-container">
    <!-- USER POSTS -->
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

    <div v-for="comment in post.comments" :key="comment.id" class="shadow-lg border-2 rounded-lg">
      <PostComment
        :id="comment.id"
        :fullname="comment.fullname"
        :avatar="comment.avatar"
        :date_time="comment.date_time"
        :comment="comment.comment"
        :replies="comment.replies"
      ></PostComment>
    </div>
  </div>
</template>
