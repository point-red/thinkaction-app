<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import {
  BaseDatepicker,
  BaseTextarea,
  BaseSelect,
  BaseInput,
  BaseAutocompleteCreate
} from '@/components/index'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { usePostStore } from '@/stores/post'
import ImageUpload from '@/modules/main/components/image-upload.vue'
import UserName from '@/modules/main/components/users/user-name.vue'
import type { ThinkActionCategory } from '@/modules/types/think-action'
import { Categories } from '@/modules/data/categories'

dayjs.extend(customParseFormat)

const list = [
  { id: 'everyone', label: 'Everyone' },
  { id: 'supporter', label: 'Supporter' },
  { id: 'private', label: 'Private' }
]

const postStore = usePostStore()
const userStore = useUserStore()
const resolutions = ref<any>([])
const router = useRouter()
const showErrors = ref(false)
const globalErrors = ref('')
const weekNumber = ref(0)
const isSending = ref(false)
const categoryResolutions = ref<ThinkActionCategory[]>([])
const combinedCategories = computed(() => {
  // Get unique categories by label
  const existingLabels = new Set(categoryResolutions.value.map((cat) => cat.category))
  const filteredDefaultCategories = Categories.filter((cat) => !existingLabels.has(cat.category))

  return [...categoryResolutions.value, ...filteredDefaultCategories]
})

const selected = ref({
  visibility: { id: 'everyone', label: 'Everyone' },
  resolution: {},
  category: {}
})

const form = ref<any>({
  caption: '',
  categoryResolutionId: '',
  resolution: {} as any,
  dueDate: '',
  shareWith: 'everyone',
  photo: []
})
const user = ref(userStore.currentUser)

onMounted(async () => {
  try {
    user.value = await userStore.getUserById(userStore.currentUser._id)
    resolutions.value = (user.value.categoryResolution ?? [])
    
    const userData = user.value
    categoryResolutions.value =
      userData.categoryResolution?.map((cat: any) => ({
        id: cat._id,
        label: cat.name
      })) || []
  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }
})

const onAutocompleteSelect = function (value: any) {
  form.value.categoryName = value.category
}

function getWeekNumber() {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000

  // Get the first day of the year
  const startDay = startOfYear.getDay()

  // Add past days and adjust based on the start of the year to calculate the week
  return Math.ceil((pastDaysOfYear + startDay + 1) / 7)
}

const onUpdateVisiblity = function (params: any) {
  if (!params.id) {
    form.value.shareWith = ''
    return
  }
  const { id } = params
  form.value.shareWith = id
}

const onUpdateResolution = async function (value: any) {
  const resolution = resolutions.value.find((r: any) => r.name === value.label || r._id === value.id)
  console.log(resolutions.value);
  
  if (resolution) {
    form.value.resolution = resolution
    form.value.categoryResolutionId = resolution._id
    selected.value.resolution = {
      id: resolution._id,
      label: resolution.name
    }
  }
}

const onImageChange = function (photos: any) {
  form.value.photo = photos
}

const submit = async function () {
  let values = form.value
  let isAllFilled = values.caption && values.shareWith && (form.value.resolution as any)?._id // @ts-ignore-all
  showErrors.value = false
  globalErrors.value = ''
  // @ts-ignore
  if (!isAllFilled) {
    showErrors.value = true
  }

  const formData = new FormData()
  formData.append('caption', values.caption)
  formData.append('categoryResolutionId', (form.value.resolution as any)?._id)
  formData.append('shareWith', values.shareWith)
  formData.append('dueDate', dayjs(values.dueDate, 'DD-MM-YYYY').toISOString())
  values.photo?.forEach((photo: any) => {
    formData.append('photo[]', photo)
  })

  if (isAllFilled) {
    isSending.value = true
    try {
      await userStore.addWeeklyGoal(formData)
      postStore.resetPosts()
      router.push('/')
    } catch (e: any) {
      globalErrors.value = e.response?.data?.errors
    }
    isSending.value = false
  }
}
</script>

<template>
  <div class="main-content-container">
    <p class="text-lg font-semibold">Create Your Weekly Goals</p>
    <hr />

    <div>
      <p class="font-semibold text-lg text-[#3D8AF7] text-center mb-8">
        Hi <UserName />, you are now in week {{ weekNumber }}, let's set a goal!
      </p>

      <!-- Select Resolution -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Select Category</span>
      <BaseAutocompleteCreate
        v-model="selected.resolution"
        @update:modelValue="onUpdateResolution"
        :list="combinedCategories"
        placeholder="Select category"
        border="full"
        :isError="showErrors && !(selected.resolution as any).id"
        error-message="Choose a category"
        class="mb-8"
      ></BaseAutocompleteCreate>

      <span class="font-semibold text-[#3D8AF7] block mb-2">Resolution</span>
      <BaseInput
        :error="showErrors && !form.resolution?.resolution ? 'Select a category' : ''"
        :model-value="form.resolution?.resolution"
        :disabled="true"
        class="mb-8"
      ></BaseInput>

      <!-- Weekly Goals -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Weekly Goals</span>
      <BaseTextarea
        :error="showErrors && !form.caption ? 'Input a caption' : ''"
        v-model="form.caption"
        border="simple"
        class="mb-8"
      ></BaseTextarea>

      <!-- due date input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Due Date</span>
      <BaseDatepicker
        :error="
          showErrors && (!form.dueDate || dayjs(form.dueDate, 'DD-MM-YYYY').isBefore(dayjs()))
            ? 'Enter a valid date'
            : ''
        "
        v-model="form.dueDate"
        border="full"
        class="mb-8"
      />

      <!-- upload photo -->
      <span class="font-semibold text-[#3D8AF7] block mb-2"
>Share the photo of your vision here</span
>
      <ImageUpload @change="onImageChange" :previousImages="[]" />

      <!-- share with -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Share With</span>
      <component
        :is="BaseSelect"
        @update:modelValue="onUpdateVisiblity"
        v-model="selected.visibility"
        :list="list"
        border="full"
        :isError="showErrors && !(selected.visibility as any)?.id"
        error-message="Choose who to share with"
      ></component>

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
</template>
