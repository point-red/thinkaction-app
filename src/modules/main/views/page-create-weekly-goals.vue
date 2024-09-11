<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BaseDatepicker, BaseTextarea, BaseSelect, BaseInput } from '@/components/index'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
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
const showErrors = ref(false)

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

onMounted(async () => {
  const user = await userStore.getUserById(userStore.currentUser._id)
  resolutions.value = user.categoryResolution ?? []
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
  // @ts-ignore
  if (!isAllFilled) {
    showErrors.value = true
  }

  const formData = new FormData()
  formData.append('caption', values.caption)
  formData.append('categoryResolutionId', (form.value.resolution as any)?._id)
  formData.append('shareWith', values.shareWith)
  formData.append('dueDate', new Date(values.dueDate.split('-').reverse().join('-')).toISOString())
  values.photos?.forEach((photo: any) => {
    formData.append('photo[]', photo)
  })

  if (isAllFilled) {
    await userStore.addWeeklyGoal(formData)
    postStore.resetPosts()
    router.push('/')
  }
}
</script>

<template>
  <div class="main-content-container">
    <p class="text-lg font-semibold">Create Your Weekly Goals</p>
    <hr />

    <div>
      <p class="font-semibold text-lg text-[#3D8AF7] text-center mb-8">
        Hi Fitri, you are now in week 8, let's set a goal!
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
          showErrors && (!form.dueDate || dayjs(form.dueDate).isBefore(dayjs()))
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
        errorMessage="Choose a visibilty"
      ></component>

      <!-- button -->
      <div class="flex justify-center space-x-2 mt-8">
        <button @click="submit" class="btn btn-primary bg-[#3D8AF7] px-7">SAVE</button>
        <button @click="router.back()" class="btn btn-danger">CANCEL</button>
      </div>
    </div>
  </div>
</template>
