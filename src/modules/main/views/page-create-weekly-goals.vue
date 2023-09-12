<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { BaseDatepicker, BaseTextarea, BaseSelect } from '@/components/index'
import { Categories } from '@/modules/data/categories'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const list = [
  { id: 'public', label: 'Everyone' },
  { id: 'supporter', label: 'Supporter' },
  { id: 'private', label: 'Private' }
]

const userStore = useUserStore()
const resolutions = ref<any>([])

const selected = ref({
  visibility: { id: 'public', label: 'Everyone' },
  resolution: {},
  category: {}
})

const form = ref({
  caption: '',
  category: {},
  resolution: { goal_id: '' },
  date_time: '',
  visibility: 'public',
  files: []
})

const categories = ref<any>([])

onMounted(() => {
  userStore.getResolutionCategories().then((data) => {
    categories.value = data
  })
  userStore.getResolutions().then((data) => {
    resolutions.value = data
  })
})

const computedResolutions = computed<any>(() => {
  return resolutions.value.filter(
    (
      r: any // @ts-ignore
    ) => (form.value.category ? r.category === form.value.category?.id : true)
  )
})

const onUpdateVisiblity = function (params: any) {
  if (!params.id) {
    form.value.visibility = ''
    return
  }
  const { id } = params
  form.value.visibility = id
}

const onUpdateResolution = function (params: any) {
  form.value.resolution = params
}

const submit = function () {
  let values = form.value
  let isAllFilled = // @ts-ignore-all
    values.caption && values.visibility && selected.value.resolution?.goal_id && values.category?.id
  if (isAllFilled) {
    // @ts-ignore
    values.category = values.category.id
    userStore.addWeeklyGoal(values)
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

      <!-- Select Resolution's Category -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Select Category</span>
      <component
        :is="BaseSelect"
        v-model="form.category"
        :list="categories.map((category: string) => ({ id: category, label: category }))"
        class="mb-8"
      ></component>

      <!-- Select Resolution -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Select Resolution</span>
      <component
        :is="BaseSelect"
        v-model="selected.resolution"
        @update:modelValue="onUpdateResolution"
        :list="
          computedResolutions.map(({ id, caption }: any) => ({
            id: id,
            label: caption,
            goal_id: id,
            caption
          }))
        "
        border="full"
        class="mb-8"
      ></component>

      <!-- Weekly Goals -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Weekly Goals</span>
      <component :is="BaseTextarea" v-model="form.caption" border="simple" class="mb-8"></component>

      <!-- due date input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Due Date</span>
      <component :is="BaseDatepicker" v-model="form.date_time" border="full" class="mb-8" />

      <!-- upload photo -->
      <span class="font-semibold text-[#3D8AF7] block mb-2"
        >Share the photo of your vision here</span
      >
      <label class="btn btn-primary bg-[#3D8AF7] mb-8">
        <input type="file" class="pointer-events-none absolute opacity-0" />
        <div class="flex items-center space-x-2">
          <i class="block i-far-arrow-up-from-bracket"></i>
          <span>Choose File</span>
        </div>
      </label>

      <!-- share with -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Share With</span>
      <component
        :is="BaseSelect"
        @update:modelValue="onUpdateVisiblity"
        v-model="selected.visibility"
        :list="list"
        border="full"
      ></component>

      <!-- button -->
      <div class="flex justify-center space-x-2 mt-8">
        <button @click="submit" class="btn btn-primary bg-[#3D8AF7] px-7">SAVE</button>
        <button class="btn btn-danger">CANCEL</button>
      </div>
    </div>
  </div>
</template>
