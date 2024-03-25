<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BaseDatepicker, BaseTextarea, BaseSelect, BaseInput } from '@/components/index'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'

const route = useRoute()
const router = useRouter()
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

const form = ref<any>({
  caption: '',
  category: '',
  resolution: { goal_id: '' },
  date_time: '',
  visibility: 'public',
  files: []
})

const id = route.params._id as string
// const categories = ref<any>([])
const currentGoal = ref<any>(null)

onMounted(() => {
  // userStore.getResolutionCategories().then((data) => {
  //   categories.value = data
  // })
  userStore.getResolutions().then((data) => {
    resolutions.value = data

    let goal = userStore.findGoalById(id as string)
    if (goal) {
      form.value = {
        category: goal.category,
        visibility: goal.visibility,
        caption: goal.caption,
        date_time: goal.date_time,
        resolution: {
          goal_id: (goal.meta as any).resolution_id,
          category: goal.category
        },
        files: goal.photos
      }
      selected.value.visibility = list.find((l) => goal?.visibility === l.id) || list[0]
      let res =
        resolutions.value.find((c: any) => c._id === (goal?.meta as any)?.resolution_id) ?? {}
      form.value.resolution.caption = res.caption
      selected.value.resolution = {
        id: res._id,
        label: res.category
      }

      currentGoal.value = goal
    }
  })
})

const onUpdateVisiblity = function (params: any) {
  if (!params._id) {
    form.value.visibility = ''
    return
  }
  const { id } = params
  form.value.visibility = id
}

const onUpdateResolution = function (params: any) {
  form.value.resolution = resolutions.value.find((r: any) => r._id === params._id)
  selected.value.resolution = params
}

const submit = function () {
  let values = form.value
  let isAllFilled = values.caption && values.visibility && (selected.value.resolution as any)?._id // @ts-ignore-all
  if (isAllFilled) {
    // @ts-ignore
    values.category = values.resolution.category
    values.resolution.goal_id = values.resolution?._id
    userStore.editWeeklyGoal(values, id)
    router.push('/')
  }
}
</script>

<template>
  <div v-if="currentGoal" class="main-content-container">
    <p class="text-lg font-semibold">Create Your Weekly Goals</p>
    <hr />

    <div>
      <p class="font-semibold text-lg text-[#3D8AF7] text-center mb-8">
        Hi Fitri, you are now in week 8, let's set a goal!
      </p>

      <!-- Select Resolution -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Select Category</span>
      <BaseSelect
        :is-error="!(selected.resolution as any)._id"
        errorMessage="Choose a category"
        :model-value="selected.resolution"
        @update:modelValue="onUpdateResolution"
        :list="
          resolutions.map(({ id, category }: any) => ({
            id: id,
            label: category,
          }))
        "
        border="full"
        class="mb-8"
      ></BaseSelect>

      <span class="font-semibold text-[#3D8AF7] block mb-2">Resolution</span>
      <BaseInput
        :error="!form.resolution?.caption ? 'Select a category' : ''"
        :model-value="form.resolution?.caption"
        :disabled="true"
        class="mb-8"
      ></BaseInput>

      <!-- Weekly Goals -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Weekly Goals</span>
      <BaseTextarea
        :error="!form.caption ? 'Enter a caption' : ''"
        v-model="form.caption"
        border="simple"
        class="mb-8"
      ></BaseTextarea>

      <!-- due date input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Due Date</span>
      <BaseDatepicker
        :error="
          !form.date_time || dayjs(form.date_time).isBefore(dayjs()) ? 'Enter a valid date' : ''
        "
        v-model="form.date_time"
        border="full"
        class="mb-8"
      />

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
      <BaseSelect
        :is-error="!(selected.visibility as any)?._id"
        :error-message="'Choose a visibility'"
        @update:modelValue="onUpdateVisiblity"
        v-model="selected.visibility"
        :list="list"
        border="full"
      ></BaseSelect>

      <!-- button -->
      <div class="flex justify-center space-x-2 mt-8">
        <button @click="submit" class="btn btn-primary bg-[#3D8AF7] px-7">SAVE</button>
        <button @click="router.back()" class="btn btn-danger">CANCEL</button>
      </div>
    </div>
  </div>
</template>
