<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BaseDatepicker, BaseTextarea, BaseSelect, BaseInput } from '@/components/index'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { usePostStore } from '@/stores/post'
import ImageUpload from '@/modules/main/components/image-upload.vue'
import UserName from '@/modules/main/components/users/user-name.vue'

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

function getWeekNumber() {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000

  // Get the first day of the year
  const startDay = startOfYear.getDay()

  // Add past days and adjust based on the start of the year to calculate the week
  return Math.ceil((pastDaysOfYear + startDay + 1) / 7)
}

onMounted(async () => {
  const user = await userStore.getUserById(userStore.currentUser._id)
  resolutions.value = user.categoryResolution ?? []
  weekNumber.value = getWeekNumber()
})

const onUpdateVisiblity = function (params: any) {
  if (!params.id) {
    form.value.shareWith = ''
    return
  }
  const { id } = params
  form.value.shareWith = id
}

const onUpdateResolution = async function (params: any) {
  form.value.resolution = resolutions.value.find((r: any) => r._id === params.id)
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
      <BaseSelect
        v-model="selected.resolution"
        @update:modelValue="onUpdateResolution"
        errorMessage="Choose a category"
        :is-error="showErrors && !(selected.resolution as any).id"
        :list="
          resolutions.map(({ _id, name }: any) => ({
            id: _id,
            label: name,
          }))
        "
        border="full"
        class="mb-8"
      ></BaseSelect>

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
