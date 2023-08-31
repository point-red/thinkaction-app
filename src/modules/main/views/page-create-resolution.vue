<script setup lang="ts">
import { ref, watch } from 'vue'
import { BaseInput, BaseDatepicker, BaseTextarea, BaseSelect } from '@/components/index'
import { Categories } from '@/modules/data/categories'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const list = [
  { id: 'public', label: 'Everyone' },
  { id: 'supporter', label: 'Supporter' },
  { id: 'private', label: 'Private' }
]

const selected = ref({
  visibility: ''
})

const form = ref({
  category: {},
  visibility: '',
  caption: '',
  date_time: '',
  files: []
})

const onUpdateVisiblity = function (params: any) {
  if (!params.id) {
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
  let isAllFilled = values.category?.id && values.caption && values.visibility
  if (isAllFilled) {
    values.category = { id: values.category.id, category: values.category.label }
    userStore.addResolutionGoal(values)
  }
  router.push('/')
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
      <component
        :is="BaseSelect"
        :list="Categories.map(({ id, category }) => ({ id, label: category }))"
        v-model="form.category"
        placeholder="Finance"
        border="full"
        class="mb-8"
      ></component>

      <!-- due date input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Due Date</span>
      <component :is="BaseDatepicker" v-model="form.date_time" border="full" class="mb-8" />

      <!-- resolution input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Resolution</span>
      <component
        :is="BaseTextarea"
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
        <input type="file" class="pointer-events-none absolute opacity-0" />
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
      ></BaseSelect>

      <!-- button -->
      <div class="flex justify-center space-x-2 mt-8">
        <button @click="save()" class="btn btn-primary bg-[#3D8AF7] px-7">SAVE</button>
        <button class="btn btn-danger">CANCEL</button>
      </div>
    </div>
  </div>
</template>
