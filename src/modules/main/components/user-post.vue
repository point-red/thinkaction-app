<script setup lang="ts">
import moment from 'moment'

type User = {
  [key: string]: any
  name: string
  avatar?: string
}

export interface Props {
  id?: string
  user?: User
  category?: string
  caption?: string
  photos?: Array<string>
  is_liked?: boolean
  cheers_count?: number
  comments_count?: number
  date_time?: string
}

const props = withDefaults(defineProps<Props>(), {
  avatar: '/public/profile.png',
  is_liked: false,
  cheers_count: 0,
  comments_count: 0
})
</script>

<template>
  <div class="shadow-lg p-3 rounded-lg border-2 mb-5">
    <!-- user info -->
    <router-link :to="{ path: `post/${props.id}` }">
      <div class="flex space-x-3 mb-3">
        <img
          :src="props.user?.avatar"
          alt="user-photo"
          class="w-20 h-20 bg-slate-300 rounded-full"
        />
        <div>
          <p class="font-bold">{{ props.user?.name }}</p>
          <p>{{ props.category }}</p>
          <p>{{ moment(props.date_time).fromNow() }}</p>
        </div>
      </div>

      <!-- caption -->
      <p>{{ props.caption }}</p>
    </router-link>

    <!-- Slider main container -->
    <swiper-container class="mySwiper" navigation="true">
      <swiper-slide v-for="photo in props.photos" :key="props.photos?.indexOf(photo)"
        ><img :src="photo" alt="goals image" class="w-[200px] h-[200px]"
      /></swiper-slide>
    </swiper-container>

    <!-- cheers and comments -->
    <div>
      <div>
        <button class="btn btn-icon rounded-full">
          <img src="/cheers.png" class="h-25px w-25px mr-2" />
          <router-link :to="{ path: `/post/${props.id}/cheers` }">
            <span>
              {{ props.cheers_count }}
            </span>
          </router-link>
        </button>
        <button class="btn btn-icon rounded-full">
          <i class="i-fas-comments h-25px w-25px mr-2"></i>{{ props.comments_count }}
        </button>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style>
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

swiper-container {
  width: 100%;
  height: 100%;
}

swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
