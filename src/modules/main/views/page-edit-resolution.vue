<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BaseInput, BaseDatepicker, BaseTextarea, BaseSelect } from '@/components/index'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { usePostStore } from '@/stores/post'
import ImageUpload from '@/modules/main/components/image-upload.vue'
import UserName from '@/modules/main/components/users/user-name.vue'

const list = [
  { id: 'everyone', label: 'Everyone' },
  { id: 'supporter', label: 'Supporter' },
  { id: 'private', label: 'Private' }
]

const router = useRouter()
const route = useRoute()
const postStore = usePostStore()
const currentGoal = ref<any>(null)
const removedPhotos = ref<string[]>([])
const id = route.params.id as string
const selected = ref({
  visibility: '' as any
})

const form = ref({
  categoryName: '',
  shareWith: '',
  caption: '',
  dueDate: '',
  photos: [] as any
})
const showErrors = ref(false)
const globalErrors = ref('')
const isSending = ref(false)

const onUpdateVisiblity = function (params: any) {
  if (!params.id) {
    form.value.shareWith = params.id
    return
  }
  const { id } = params
  form.value.shareWith = id
}

const onImageChange = function (photos: any) {
  form.value.photos = photos
}

const removePrev = (photoUrl: string) => {
  removedPhotos.value.push(photoUrl)
}

const userStore = useUserStore()
const save = async function () {
  let values = form.value
  // @ts-ignore
  let isAllFilled = values.categoryName && values.caption && values.shareWith && values.dueDate
  showErrors.value = false
  globalErrors.value = ''

  if (!isAllFilled) {
    showErrors.value = true
    return
  }
  isSending.value = true

  const formData = new FormData()
  formData.append('caption', values.caption)
  formData.append('categoryName', values.categoryName)
  formData.append('shareWith', values.shareWith)
  formData.append('dueDate', new Date(values.dueDate.split('-').reverse().join('-')).toISOString())
  values.photos?.forEach((photo: any) => {
    formData.append('photo[]', photo)
  })

  removedPhotos.value.forEach((url: string) => {
    formData.append('removedImages[]', url)
  })

  try {
    await userStore.editResolutionGoal(formData, id)
    postStore.resetPosts()
    router.push('/')
  } catch (e: any) {
    globalErrors.value = e.response?.data?.errors
  }
  isSending.value = false
}

onMounted(async () => {
  let goal = await postStore.getPostById(id as string)
  if (goal?._id) {
    form.value = {
      categoryName: goal.categoryName,
      shareWith: goal.shareWith,
      caption: goal.caption,
      dueDate: dayjs(goal.dueDate)?.format?.('DD-MM-YYYY'),
      photos: goal.photos
    }
    const resolution =
      goal?.userInfo?.categoryResolution?.find((c: any) => goal.categoryResolutionId === c._id)
        ?.name ?? ''
    form.value.categoryName = resolution
    selected.value.visibility = list.find((l) => l.id === goal?.shareWith) ?? list[0]
    currentGoal.value = goal
  }
})
</script>

<template>
  <div v-if="currentGoal" class="main-content-container">
    <p class="text-lg font-semibold">Update Resolution</p>
    <hr />

    <div>
      <p class="font-semibold text-lg text-[#3D8AF7] text-center mb-5">
        Hi <UserName />, let's start by setting up your resolutions!
      </p>

      <!-- category input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Category</span>
      <BaseInput
        v-model="form.categoryName"
        :error="showErrors && !(form.categoryName as any)? 'Enter a category name': ''"
        placeholder="Input your category"
        class="mb-8"
      ></BaseInput>

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

      <!-- resolution input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Resolution</span>
      <component
        :is="BaseTextarea"
        :error="showErrors && !form.caption ? 'Enter a caption' : ''"
        placeholder="Make sure you include numbers in them ex: lose 5kg by end of year "
        v-model="form.caption"
        border="simple"
        class="mb-8"
      ></component>

      <!-- upload photo -->
      <span class="font-semibold text-[#3D8AF7] block mb-2"
        >Share the photo of your vision here</span
      >
      <ImageUpload
        @change="onImageChange"
        :previousImages="currentGoal.photo"
        @remove="removePrev"
      />

      <!-- share with -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Share With</span>
      <BaseSelect
        @update:modelValue="onUpdateVisiblity($event)"
        v-model="selected.visibility"
        :list="list"
        border="full"
        :isError="showErrors && !(selected.visibility as any)?.id"
        error-message="Choose who to share with"
      ></BaseSelect>

      <p class="text-xs mt-1 ml-2 text-red-5" v-if="globalErrors">
        {{ globalErrors }}
      </p>

      <!-- button -->
      <div class="flex justify-center space-x-2 mt-8">
        <button @click="save()" :disabled="isSending" class="btn btn-primary bg-[#3D8AF7] px-7">
          SAVE
        </button>
        <button @click="router.back()" class="btn btn-danger">CANCEL</button>
      </div>
    </div>
  </div>
  <div v-else>Goal not found</div>
</template>
