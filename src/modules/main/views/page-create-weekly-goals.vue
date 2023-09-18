<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { BaseDatepicker, BaseTextarea, BaseSelect, BaseInput } from '@/components/index'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import moment from 'moment'

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
    ) => true
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

const onUpdateResolution = async function (params: any) {
  form.value.resolution = params
  form.value.category = (await userStore.getCurrentGoals()).find(
    (d) => d.id === params.id
  )?.category
}

const submit = function () {
  let values = form.value
  let isAllFilled = // @ts-ignore-all
    values.caption && values.visibility && selected.value.resolution?.goal_id && values.category
  if (isAllFilled) {
    // @ts-ignore
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

      <!-- Select Resolution -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Select Resolution</span>
      <BaseSelect
        v-model="selected.resolution"
        @update:modelValue="onUpdateResolution"
        errorMessage="Choose a resolution"
        :is-error="!(selected.resolution as any).id"
        :list="
          computedResolutions.map(({ id, caption }: any) => ({
            id: id,
            label: caption,
            goal_id: id,
            caption
          }))
        "
        class="mb-8"
      ></BaseSelect>

      <span class="font-semibold text-[#3D8AF7] block mb-2">Category</span>
      <BaseInput
        :error="!form.category ? 'Select a resolution' : ''"
        :model-value="form.category"
        :disabled="true"
        class="mb-8"
      ></BaseInput>

      <!-- Weekly Goals -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Weekly Goals</span>
      <BaseTextarea
        :error="!form.caption ? 'Input a caption' : ''"
        v-model="form.caption"
        border="simple"
        class="mb-8"
      ></BaseTextarea>

      <!-- due date input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Due Date</span>
      <BaseDatepicker
        :error="!form.date_time || moment(form.date_time).isBefore(moment()) ? 'Input a date' : ''"
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
      <component
        :is="BaseSelect"
        @update:modelValue="onUpdateVisiblity"
        v-model="selected.visibility"
        :list="list"
        border="full"
        :isError="!(selected.visibility as any)?.id"
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
