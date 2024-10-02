<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { BaseInput, BaseCheckbox, BaseSelect } from '@/components/index'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { usePostStore } from '@/stores/post'
import ImageUpload from '@/modules/main/components/image-upload.vue'

const list = [
  { id: 'everyone', label: 'Everyone' },
  { id: 'supporter', label: 'Supporter' },
  { id: 'private', label: 'Private' }
]

const postStore = usePostStore()
const userStore = useUserStore()
const resolutions = ref<any>([])

const router = useRouter()
const goals = ref<any>([])
const isSending = ref(false)
const user = ref(userStore.currentUser)

onMounted(async () => {
  user.value = await userStore.getUserById(userStore.currentUser._id)
  resolutions.value = (user.value.categoryResolution ?? []).filter((c: any) => c.postCount)
})

const getWeeklyGoals = async (id: string) => {
  const options = {
    params: {
      limit: 100,
      page: 1,
      userId: user.value._id,
      categoryResolutionId: id
    }
  }
  goals.value = (await postStore.getPosts(options)).filter((p: any) => p.type === 'weeklyGoals')
}

const computedGoals = computed(() => {
  return goals.value
    .filter((g: any) => g.categoryResolutionId === form.value.category?.id)
    ?.map((g: any) => ({
      id: g._id,
      label: g.caption,
      dueDate: g.dueDate
    }))
})

const checked = ref<any>(false)

const form = ref<any>({
  caption: '',
  category: {},
  goal: {},
  shareWith: {},
  photos: []
})

const showErrors = ref(false)
const globalErrors = ref('')

const submit = async function () {
  let category: any = form.value.category
  let goal: any = form.value.goal
  let shareWith: any = form.value.shareWith
  let values = form.value
  let isAllFilled = category?.id && goal?.id && shareWith?.id && (form.value.category as any)?.id // @ts-ignore-all
  showErrors.value = false
  globalErrors.value = ''

  if (!isAllFilled) {
    showErrors.value = true
    return
  }
  // @ts-ignore
  isSending.value = true
  const formData = new FormData()
  formData.append('caption', values.caption)
  formData.append('weeklyGoalId', (form.value.goal as any)?.id)
  formData.append('categoryResolutionId', (form.value.category as any)?.id)
  formData.append('shareWith', values.shareWith?.id)
  formData.append('updatedDate', new Date().toISOString())
  formData.append('isComplete', checked.value)
  values.photos?.forEach((photo: any) => {
    formData.append('photo[]', photo)
  })

  try {
    await userStore.addCompleteGoal(formData)
    postStore.resetPosts()
    router.push('/')
  } catch (e: any) {
    globalErrors.value = e.response?.data?.errors
  }

  isSending.value = false
}
const onImageChange = function (photos: any) {
  form.value.photos = photos
}

watch(
  () => form.value.category,
  (val) => {
    if (val.id) {
      getWeeklyGoals(val.id)
      form.value.goal = {}
    }
  }
)
</script>

<template>
  <div class="main-content-container">
    <p class="text-lg font-semibold">Create Your Complete Goals</p>
    <hr />
    <div>
      <p class="font-semibold text-lg text-[#3D8AF7] text-center mb-8">
        Congratulations! You have achieved your weekly goals, let record them!
      </p>

      <!-- Select Resolution's Category -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Select Category</span>
      <BaseSelect
        :is-error="showErrors && !(form.category as any)?.id"
        error-message="Choose a category"
        v-model="form.category"
        :list="resolutions.map((r: any) => ({ id: r?._id, label: r.name }))"
        class="mb-8"
      ></BaseSelect>

      <!-- Select Goals Achieved -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Goals Achieved</span>
      <BaseSelect
        :is-error="showErrors && !(form.goal as any)?.id"
        error-message="Choose a goal"
        v-model="form.goal"
        :list="computedGoals"
        border="full"
        class="mb-8"
      ></BaseSelect>

      <!-- Caption -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Caption</span>
      <BaseInput
        :error="showErrors && !form.caption ? 'Enter a caption' : ''"
        v-model="form.caption"
        border="full"
        class="mb-8"
      ></BaseInput>

      <!-- upload photo -->
      <span class="font-semibold text-[#3D8AF7] block mb-2"
        >Share the photo of your vision here</span
      >
      <ImageUpload @change="onImageChange" :previousImages="[]" />

      <!-- Checkbox to Complete the Goal -->
      <div class="w-full">
        <component :is="BaseCheckbox" v-model="checked" label="Complete Goals" class="mb-8" />
      </div>

      <!-- share with -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Share With</span>
      <BaseSelect
        :is-error="showErrors && !(form.shareWith as any)?.id"
        error-message="Choose a shareWith"
        v-model="form.shareWith"
        :list="list"
        border="full"
      ></BaseSelect>

      <p class="text-xs mt-1 ml-2 text-red-5" v-if="globalErrors">
        {{ globalErrors }}
      </p>

      <!-- button -->
      <div class="flex justify-center space-x-2 mt-8">
        <button @click="submit" :disabled="isSending" class="btn btn-primary bg-[#3D8AF7] px-7">
          SAVE
        </button>
        <button class="btn btn-danger">CANCEL</button>
      </div>
    </div>
  </div>
</template>
