<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BaseInput, BaseDatepicker, BaseTextarea, BaseSelect } from '@/components/index'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'

const list = [
  { id: 'public', label: 'Everyone' },
  { id: 'supporter', label: 'Supporter' },
  { id: 'private', label: 'Private' }
]

const route = useRoute()

const id = route.params._id
const selected = ref<any>({
  visibility: ''
})

const currentGoal = ref<any>(null)
const form = ref<any>({
  category: '',
  visibility: '',
  caption: '',
  date_time: '',
  files: []
})

const onUpdateVisiblity = function (params: any) {
  if (!params._id) {
    form.value.visibility = ''
    return
  }
  const { id } = params
  form.value.visibility = id
}

const userStore = useUserStore()
const save = function () {
  let values = form.value
  // @ts-ignore
  let isAllFilled = values.category && values.caption && values.visibility
  if (isAllFilled) {
    userStore.editResolutionGoal(values, id as string)
    router.push('/')
  }
}

onMounted(() => {
  let goal = userStore.findGoalById(id as string)
  if (goal) {
    form.value = {
      category: goal.category,
      visibility: goal.visibility,
      caption: goal.caption,
      date_time: goal.date_time,
      files: goal.photos
    }
    selected.value.visibility = list.find((l) => goal?.visibility === l.id) || list[0]
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
        Hi Fitri, let's start by setting up your resolutions!
      </p>

      <!-- category input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Category</span>
      <BaseInput
        :error="!form.category ? 'Enter a category' : ''"
        v-model="form.category"
        placeholder="Input your category"
        border="full"
        class="mb-8"
      ></BaseInput>

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

      <!-- resolution input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Resolution</span>
      <BaseTextarea
        :error="!form.category ? 'Enter a caption' : ''"
        placeholder="Make sure you include numbers in them ex: lose 5kg by end of year "
        v-model="form.caption"
        border="simple"
        class="mb-8"
      ></BaseTextarea>

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
        :isError="!(selected.visibility as any)?._id"
        errorMessage="Choose a visibilty"
        @update:modelValue="onUpdateVisiblity($event)"
        v-model="selected.visibility"
        :list="list"
        border="full"
      ></BaseSelect>

      <!-- button -->
      <div class="flex justify-center space-x-2 mt-8">
        <button @click="save()" class="btn btn-primary bg-[#3D8AF7] px-7">SAVE</button>
        <button @click="router.back()" class="btn btn-danger">CANCEL</button>
      </div>
    </div>
  </div>
  <div v-else>Goal not found</div>
</template>
