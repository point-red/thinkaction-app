<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput, BaseDatepicker, BaseTextarea, BaseSelect } from '@/components/index'
import { useUserStore } from '@/stores/user'
import dayjs from 'dayjs'
import router from '@/router'

const list = [
  { id: 'everyone', label: 'Everyone' },
  { id: 'supporter', label: 'Supporter' },
  { id: 'private', label: 'Private' }
]

const selected = ref({
  visibility: ''
})

const form = ref({
  categoryName: '',
  shareWith: '',
  caption: '',
  dueDate: '',
  photos: [] as any
})

const onUpdateVisiblity = function (params: any) {
  if (!params.id) {
    form.value.shareWith = params.id
    return
  }
  const { id } = params
  form.value.shareWith = id
}

const onImageChange = function (event: any) {
  form.value.photos = [...event.target.files] ?? []
}

const userStore = useUserStore()
const save = async function () {
  let values = form.value
  // @ts-ignore
  let isAllFilled = values.categoryName && values.caption && values.shareWith && values.dueDate

  const formData = new FormData()
  formData.append('caption', values.caption)
  formData.append('categoryName', values.categoryName)
  formData.append('shareWith', values.shareWith)
  formData.append('dueDate', new Date(values.dueDate.split('-').reverse().join('-')).toISOString())
  values.photos?.forEach((photo: any) => {
    formData.append('photo[]', photo)
  })

  if (isAllFilled) {
    await userStore.addResolutionGoal(formData)
    router.push('/')
  }
}
</script>

<template>
  <div class="main-content-container">
    <p class="text-lg font-semibold">Create Your Resolution</p>
    <hr />

    <div>
      <p class="font-semibold text-lg text-[#3D8AF7] text-center mb-5">
        Hi Fitri, let's start by setting up your resolutions!
      </p>

      <!-- category input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Category</span>
      <BaseInput
        v-model="form.categoryName"
        :error="!(form.categoryName as any)? 'Enter a category name': ''"
        placeholder="Input your category"
        class="mb-8"
      ></BaseInput>

      <!-- due date input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Due Date</span>
      <BaseDatepicker
        :error="!form.dueDate || dayjs(form.dueDate).isBefore(dayjs()) ? 'Enter a valid date' : ''"
        v-model="form.dueDate"
        border="full"
        class="mb-8"
      />

      <!-- resolution input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Resolution</span>
      <component
        :is="BaseTextarea"
        :error="!form.caption ? 'Enter a caption' : ''"
        placeholder="Make sure you include numbers in them ex: lose 5kg by end of year "
        v-model="form.caption"
        border="simple"
        class="mb-8"
      ></component>

      <!-- upload photo -->
      <span class="font-semibold text-[#3D8AF7] block mb-2"
        >Share the photo of your vision here</span
      >
      <label class="btn btn-primary bg-[#3D8AF7] mb-8">
        <input
          type="file"
          @change="onImageChange"
          multiple
          class="pointer-events-none absolute opacity-0"
        />
        <div class="flex items-center space-x-2">
          <i class="block i-far-arrow-up-from-bracket"></i>
          <span>Choose File</span>
        </div>
      </label>

      <!-- share with -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Share With</span>
      <BaseSelect
        @update:modelValue="onUpdateVisiblity($event)"
        v-model="selected.visibility"
        :list="list"
        border="full"
        :isError="!(selected.visibility as any)?.id"
        errorMessage="Choose a visibilty"
      ></BaseSelect>

      <!-- button -->
      <div class="flex justify-center space-x-2 mt-8">
        <button @click="save()" class="btn btn-primary bg-[#3D8AF7] px-7">SAVE</button>
        <button @click="router.back()" class="btn btn-danger">CANCEL</button>
      </div>
    </div>
  </div>
</template>
