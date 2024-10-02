<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { BaseInput, BaseCheckbox, BaseSelect } from '@/components/index'
import ImageUpload from '@/modules/main/components/image-upload.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { usePostStore } from '@/stores/post'

const privateTypes = [
  { id: 'everyone', label: 'Everyone' },
  { id: 'supporter', label: 'Supporter' },
  { id: 'private', label: 'Private' }
]
const userStore = useUserStore()
const postStore = usePostStore()
const router = useRouter()

const resolutions = ref<any>([])
const goals = ref<any>([])
const currentGoal = ref<any>(null)
const removedPhotos = ref<string[]>([])
const globalErrors = ref('')
const isSending = ref(false)
const user = ref(userStore.currentUser)

onMounted(async () => {
  const id = router.currentRoute.value.params.id
  user.value = await userStore.getUserById(userStore.currentUser._id)
  const goal = await postStore.getPostById(id as string)
  resolutions.value = (user.value.categoryResolution ?? []).filter(
    (c: any) => c.postCount || goal.categoryResolutionId === c._id
  )

  if (goal) {
    const weeklyGoal = await postStore.getPostById(goal.weeklyGoalId as string)
    form.value = {
      visibility: privateTypes.find((p) => p.id === (goal as any).shareWith) ?? {},
      caption: goal.caption,
      category: {
        id: goal.categoryResolutionId,
        label: resolutions.value.find((r: any) => r?._id === goal.categoryResolutionId)?.name
      },
      goal: {
        id: goal.weeklyGoalId,
        label: weeklyGoal?.caption
      },
      photos: goal.photos
    }
    checked.value = goal.isComplete
    currentGoal.value = goal
  }
})

const computedGoals = computed(() => {
  return goals.value
    .filter((g: any) => (form.value.category?._id ? g.category === form.value.category?._id : ''))
    .map((a: any) => {
      return {
        id: a._id,
        label: a.caption
      }
    })
})

const onImageChange = function (photos: any) {
  form.value.photos = photos
}

const checked = ref<any>(false)

const form = ref<any>({
  caption: '',
  category: {},
  goal: {},
  visibility: '',
  files: []
})
const showErrors = ref(false)

const submit = async function () {
  let category: any = form.value.category
  let goal: any = form.value.goal
  let visibility: any = form.value.visibility
  let values = form.value
  const isAllFilled = category.id && goal.id && visibility.id && currentGoal

  showErrors.value = false
  globalErrors.value = ''
  if (!isAllFilled) {
    showErrors.value = true
    return
  }

  isSending.value = true
  const formData = new FormData()
  formData.append('caption', values.caption)
  formData.append('weeklyGoalId', (form.value.goal as any)?.id)
  formData.append('categoryResolutionId', (form.value.category as any)?.id)
  formData.append('shareWith', values.visibility?.id)
  formData.append('updatedDate', new Date().toISOString())
  formData.append('isComplete', checked.value)
  values.photos?.forEach((photo: any) => {
    formData.append('photo[]', photo)
  })

  removedPhotos.value.forEach((url: string) => {
    formData.append('removedImages[]', url)
  })

  if (isAllFilled) {
    try {
      await userStore.editCompleteGoal(formData, (currentGoal.value as any)._id)
      postStore.resetPosts()
      router.push('/')
    } catch (e: any) {
      globalErrors.value = e.response?.data?.errors
    }
  }
  isSending.value = false
}

const removePrev = (photoUrl: string) => {
  removedPhotos.value.push(photoUrl)
}
</script>
<template>
  <div v-if="currentGoal" class="main-content-container">
    <p class="text-lg font-semibold">Update Your Complete Goal</p>
    <hr />
    <div>
      <p class="font-semibold text-lg text-[#3D8AF7] text-center mb-8">
        Congratulations! You have achieved your weekly goals, let record them!
      </p>

      <!-- Select Resolution's Category -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Select Category</span>
      <BaseSelect
        :error-message="showErrors && !(form.category as any)?._id ? 'Choose a category': ''"
        v-model="form.category"
        :list="resolutions.map(({ _id, name }: any) => ({
            id: _id,
            label: name,
        }))"
        disabled
        class="mb-8"
      ></BaseSelect>

      <!-- Select Goals Achieved -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Goals Achieved</span>
      <BaseSelect
        :error-message="showErrors && !(form.goal as any)?.id ? 'Choose a goal': ''"
        v-model="form.goal"
        :list="computedGoals"
        border="full"
        disabled
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
      <ImageUpload
        @change="onImageChange"
        :previousImages="currentGoal.photo"
        @remove="removePrev"
      />

      <!-- Checkbox to Complete the Goal -->
      <component :is="BaseCheckbox" v-model="checked" label="Complete Goals" class="mb-8" />

      <!-- share with -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Share With</span>
      <BaseSelect
        :error-message="showErrors && !(form.visibility as any)?._id ? 'Choose a visibility': ''"
        v-model="form.visibility"
        :list="privateTypes"
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
        <button @click="router.back()" class="btn btn-danger">CANCEL</button>
      </div>
    </div>
  </div>
  <div v-else>Goal not found</div>
</template>
