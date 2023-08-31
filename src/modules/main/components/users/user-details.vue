<script lang="ts"></script>
<script setup lang="ts">
import type {
  ThinkActionUser,
  ThinkActionCategory,
  ThinkActionGoal
} from '../../../types/think-action'
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseProfileHeader from '../profile-header.vue'
import BaseResolutionCategory from '../profile-resolution-categories.vue'
import BaseUserPost from '../user-post.vue'

type Props = {
  is_current_user?: boolean
  user: ThinkActionUser | null
  posts: ThinkActionGoal[]
  categories?: ThinkActionCategory[]
}

const props = withDefaults(defineProps<Props>(), {
  is_current_user: false,
  user: null
})

const selectedCategory = ref('')

const selectCategory = function (id: string) {
  selectedCategory.value = id
}

let isSupporting = ref(false)

const userPosts = computed(() => {
  if (selectedCategory.value === '') {
    return props.posts
  }
  return props.posts.filter((p: ThinkActionGoal) => {
    return p.category?.id === selectedCategory.value
  })
})
</script>

<template>
  <div v-if="props.user" class="main-content-container">
    <!-- PROFILE HEADER -->
    <BaseProfileHeader
      :id="props.user.id"
      :full_name="props.user.full_name!"
      :username="props.user.username"
      :avatar="props.user.avatar"
      :bio="props.user.bio!"
      :is_private="props.user.is_private!"
      :is_supporting="isSupporting"
      @support="isSupporting = !isSupporting"
      :goals_performance="props.user.goals_performance!"
      :supporting_count="props.user.supporting_count!"
      :supporter_count="props.user.supporter_count!"
      :is_user="props.is_current_user"
    ></BaseProfileHeader>

    <div v-if="!props.is_current_user">
      <!-- SUPPORTING BUTTON -->
      <button
        @click="isSupporting = true"
        v-if="isSupporting == false"
        class="btn bg-[#3D8AF7] w-full font-semibold text-white md:hidden"
      >
        Support
      </button>
      <template v-if="isSupporting">
        <button
          @click="isSupporting = false"
          class="btn bg-slate-300 text-sky-500 w-full font-semibold text-white md:hidden"
        >
          Supporting
        </button>
        <!-- <button class="  btn bg-slate-400 w-full font-semibold text-white md:hidden">Unsupport</button> -->
      </template>
    </div>
    <router-link v-else :to="{ path: '/profile/edit' }">
      <button class="btn bg-[#3D8AF7] w-full font-semibold text-white mt-5">Edit Profile</button>
    </router-link>

    <!-- RESOLUTIONS -->
    <div>
      <hr class="border" />
      <BaseResolutionCategory
        :selected_category_id="selectedCategory"
        :resolution_categories="props.categories!"
        @select="selectCategory"
      ></BaseResolutionCategory>
      <hr class="border" />
    </div>

    <div class="space-y-2">
      <!-- USER POSTS -->
      <div v-for="post in userPosts" :key="post.id">
        <BaseUserPost
          :key="post.id"
          :id="post.id"
          :user="post.user!"
          :category="post.category!"
          :caption="post.caption"
          :photos="post.photos"
          :is_liked="post.is_liked_by_user"
          :cheers_count="post.cheers_count"
          :comments_count="post.comments_count"
          :date_time="post.date_time"
          :created_at="post.created_at"
        ></BaseUserPost>
      </div>
    </div>
  </div>
</template>
