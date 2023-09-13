<script setup lang="ts">
import moment from 'moment'
import type { ThinkActionUser, ThinkActionCategory } from '@/modules/types/think-action'
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'

export interface Props {
  id?: string
  user?: ThinkActionUser
  user_id?: string
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

const store = useUserStore()
const viewPost = function (e: any) {}
const preventView = function (e: any) {}
const actionToggled = ref(false)
const isLiked = ref(false)
const deleteModal = ref(false)

const user = computed(() => store.findUserById(props.user_id as string) ?? null)
const currentUser = computed(() => store.currentUser)
const likePost = function () {
  let id = props.id
  store.likePost(id as string)
  isLiked.value = !isLiked.value
}

onMounted(() => {
  isLiked.value = props.is_liked
})
const toggleAction = function (e: any) {
  actionToggled.value = true
}

const openDeleteModal = function (e: any) {
  deleteModal.value = true
  actionToggled.value = false
}

const deletePost = function () {
  store.deleteGoal(props.id as string)
  deleteModal.value = false
}
</script>

<template>
  <div class="shadow-sm bg-white p-3 rounded-lg border mb-5">
    <div
      v-if="deleteModal"
      class="z-100 fixed w-screen h-screen top-0 left-0 bg-black/20 flex items-center justify-center"
    >
      <div class="bg-white px-6 py-4 flex flex-col gap-4 font-medium rounded-lg">
        <h3 class="text-lg">Are you sure to delete this post?</h3>
        <div class="flex flex-row gap-2">
          <button
            @click="deletePost"
            class="px-3 py-2 rounded-lg text-white bg-red-500 gover:bg-red-600 flex-grow"
          >
            Delete
          </button>
          <button @click="deleteModal = false" class="px-3 py-2 rounded-lg bg-white flex-grow">
            Cancel
          </button>
        </div>
      </div>
    </div>
    <!-- user info -->
    <div>
      <div class="w-full flex gap-x-3 mb-3 items-center">
        <router-link
          :to="{ path: `/user/${props.user_id}` }"
          class="flex gap-x-3 mb-3 items-center"
        >
          <img
            :src="user?.avatar!"
            alt="user-photo"
            class="w-14 h-14 object-cover bg-slate-300 rounded-full"
          />
          <div>
            <p class="font-bold">{{ user?.full_name! }}</p>
            <p class="text-sm">
              {{ typeof props.category === 'string' ? props.category : props.category?.category }}
            </p>
            <p class="text-sm text-slate-400">{{ moment(props.created_at).fromNow() }}</p>
          </div>
        </router-link>
        <div
          v-click-outside
          @onClickOutside="
            (e: any) => {
              actionToggled = false
            }
          "
          class="ml-auto mb-auto relative"
        >
          <button @click="toggleAction">
            <i class="block w-[25px] h-[25px] i-fas-ellipsis-vertical bg-gray-500"></i>
          </button>
          <div
            v-if="actionToggled"
            class="absolute z-[100] top-8 right-0 shadow-md rounded-sm bg-white flex text-sm md:text-base flex-col"
          >
            <template v-if="currentUser.id === props.user_id">
              <button class="px-4 md:py-2 py-1.5 hover:bg-slate-100 text-left">Edit</button>
              <button
                @click="openDeleteModal"
                class="px-4 md:py-2 py-1.5 text-red-500 hover:bg-slate-100 text-left"
              >
                Delete
              </button>
            </template>
          </div>
        </div>
      </div>
      <!-- caption -->
      <p class="my-2">
        {{ props.caption }}
      </p>
    </div>

    <!-- Slider main container -->
    <swiper-container class="mySwiper" navigation="true">
      <swiper-slide v-for="photo in props.photos" :key="props.photos?.indexOf(photo)"
        ><img
          :src="photo"
          alt="goals image"
          class="w-full md:max-h-none max-h-[250px] object-cover"
      /></swiper-slide>
    </swiper-container>

    <!-- cheers and comments -->
    <div>
      <div>
        <button class="btn btn-icon rounded-full mt-2">
          <img
            src="/cheers.png"
            class="h-25px w-25px mr-2"
            @click="likePost()"
            :class="!isLiked ? 'opacity-50' : 'opacity-100'"
          />
          <router-link :to="{ path: `/post/${props.id}/cheers` }">
            <span>
              {{ props.cheers_count + (isLiked ? 1 : 0) }}
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
