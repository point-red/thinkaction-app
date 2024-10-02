<script lang="ts"></script>
<script setup lang="ts">
import type { ThinkActionUser } from '../../../types/think-action'
import { computed, ref, onMounted, watch, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import BaseProfileHeader from '../profile-header.vue'
import BaseResolutionCategory from '../profile-resolution-categories.vue'
import BaseUserPost from '../user-post.vue'
import { useUserStore } from '@/stores/user'
import { usePostStore } from '@/stores/post'

type Props = {
  is_current_user?: boolean
  user: ThinkActionUser | null
}

const props = withDefaults(defineProps<Props>(), {
  is_current_user: false,
  user: null
})

const postStore = usePostStore()
const posts = ref<any>([])
const currentPage = ref(1)
const POST_LIMIT = 7
const isLoading = ref(false)
const total = ref(-1)

const loadPosts = async (force = false) => {
  if (!(total.value === -1 || total.value > (currentPage.value - 1) * POST_LIMIT) && !force) {
    return
  }
  isLoading.value = true
  const { posts: loadedPosts, total: currentTotal } = await postStore.getPosts(
    {
      params: {
        limit: POST_LIMIT,
        page: currentPage.value,
        userId: props.user?._id,
        ...(selectedCategory.value ? { categoryResolutionId: selectedCategory.value } : {})
      }
    },
    force,
    false
  )
  if (!loadedPosts?.length) {
    currentPage.value -= 1
  }
  if (force) {
    posts.value = loadedPosts
  } else {
    posts.value.push(...loadedPosts)
  }
  total.value = currentTotal
  isLoading.value = false
}
const userStore = useUserStore()

const emit = defineEmits(['update'])

const selectedCategory = ref('')

const selectCategory = function (id: string) {
  selectedCategory.value = id
  currentPage.value = 1
  total.value = -1
  posts.value = []
  loadPosts()
}

const computedCategories = computed(() => {
  return (
    props.user?.categoryResolution?.map((c: any) => ({
      label: c.name,
      id: c._id
    })) ?? []
  )
})
// TODO: Add async functions
const supportUser = async function () {
  const data = await userStore.toggleSupport(
    (props.user as any)._id,
    (props.user as any).isRequesting || (props.user as any).isSupporting
  )
  emit('update', {
    ...props.user,
    ...data
  })
}
// onMounted(() => {
//   isSupporting.value = userStore.isSupporting((props.user as any)._id)
// })
const goalsPerformance = computed(() => {
  const length = props.user?.categoryResolution?.length ?? 1
  const matched = props.user?.categoryResolution?.filter((c: any) => c.isComplete)?.length
  return Math.round((matched / length) * 10000) / 100
})

onMounted(() => {
  document.getElementsByTagName('main')?.[0]?.addEventListener('scroll', handleScroll)
  if (!props.user?._id) {
    return
  }
  loadPosts()
})

onUnmounted(() => {
  document.getElementsByTagName('main')?.[0]?.removeEventListener('scroll', handleScroll)
})

watch(
  () => props.user,
  (val) => {
    currentPage.value = 1
    if (!val?._id) {
      return
    }
    loadPosts()
  }
)

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
  <div v-if="props.user" class="main-content-container">
    <!-- PROFILE HEADER -->
    <BaseProfileHeader
      :id="props.user._id"
      :full_name="props.user.fullname!"
      :username="props.user.username"
      :avatar="props.user.photo"
      :bio="props.user.bio!"
      :goals-performance="goalsPerformance"
      :is_private="!props.user.isPublic!"
      :is-supporting="props.user.isSupporting"
      :is-requesting="props.user.isRequesting"
      @support="supportUser"
      :goals_performance="props.user.goals_performance!"
      :supporting-count="props.user.supportingCount!"
      :supporter-count="props.user.supporterCount!"
      :is_user="props.is_current_user"
    ></BaseProfileHeader>

    <div v-if="!props.is_current_user">
      <!-- SUPPORTING BUTTON -->
      <button
        v-if="props.user.isRequesting"
        @click="supportUser"
        class="btn bg-slate-400 w-full font-semibold text-white md:hidden"
      >
        Requesting
      </button>
      <button
        @click="supportUser"
        v-else-if="!props.user.isSupporting"
        class="btn bg-[#3D8AF7] w-full font-semibold text-white md:hidden"
      >
        Support
      </button>
      <template v-else>
        <button
          @click="supportUser"
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
    <div v-if="computedCategories?.length">
      <hr class="border" />
      <BaseResolutionCategory
        :selected_category_id="selectedCategory"
        :resolution_categories="computedCategories"
        @select="selectCategory"
      ></BaseResolutionCategory>
      <hr class="border" />
    </div>

    <div class="space-y-2">
      <!-- USER POSTS -->
      <div v-for="post in posts" :key="post._id">
        <BaseUserPost
          :goal_type="post.type"
          :key="post._id"
          :id="post._id"
          :user_id="post?.userId!"
          :user="post.userInfo!"
          :category="post.name!"
          :caption="post.caption"
          :photos="post.photo"
          :liked-by-current="post.likedByCurrent"
          :like-count="post.likeCount"
          :comment-count="post.commentCount"
          :date_time="post.date_time"
          :created_at="post.createdDate"
        ></BaseUserPost>
      </div>
      <div
        v-if="isLoading"
        class="py-4 flex items-center justify-center text-center absolute bottom-10 w-full z-[100]"
      >
        <div>Loading...</div>
      </div>
    </div>
  </div>
</template>
