<script setup lang="ts">
import moment from 'moment'
import type { ThinkActionUser, ThinkActionCategory } from '@/modules/types/think-action'

export interface Props {
  id?: string
  user?: ThinkActionUser
  category?: ThinkActionCategory | string
  caption?: string
  photos?: Array<string>
  is_liked?: boolean
  cheers_count?: number
  comments_count?: number
  date_time?: string
  created_at?: string
}

const props = withDefaults(defineProps<Props>(), {
  avatar: '/public/profile.png',
  is_liked: false,
  cheers_count: 0,
  comments_count: 0
})

const viewPost = function (e: any) {}
const preventView = function (e: any) {}
</script>

<template>
  <div class="shadow-sm bg-white p-3 rounded-lg border mb-5">
    <!-- user info -->
    <router-link :to="{ path: `/post/${props.id}` }">
      <div class="flex space-x-3 mb-3 items-center">
        <img
          :src="props.user?.avatar"
          alt="user-photo"
          class="w-20 h-20 bg-slate-300 rounded-full"
        />
        <div>
          <p class="font-bold">{{ props.user?.name! }}</p>
          <p class="text-sm">
            {{ typeof props.category === 'string' ? props.category : props.category?.category }}
          </p>
          <p class="text-sm text-slate-400">{{ moment(props.created_at).fromNow() }}</p>
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
        <router-link :to="{ path: `/post/${props.id}` }" class="btn btn-icon rounded-full">
          <i class="i-fas-comments h-25px w-25px mr-2"></i>{{ props.comments_count }}
        </router-link>
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
