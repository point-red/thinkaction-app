<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput, BaseCheckbox, BaseSelect } from '@/components/index'
import { Categories } from '@/modules/data/categories'
import { useUserStore } from '@/stores/user'

const privateTypes = [
  { id: 'public', label: 'Everyone' },
  { id: 'supporter', label: 'Supporter' },
  { id: 'private', label: 'Private' }
]

const categories = Categories.map(({ category, id }) => ({ id, label: category }))

const userStore = useUserStore()
const goals = userStore.weeklyResolutions.map((a) => ({
  id: a.goal_id,
  label: a.caption
}))

const checked = ref(false)

const form = ref({
  caption: '',
  category: {},
  goal: {},
  visibility: '',
  files: []
})

const submit = function () {
  let category: any = form.value.category
  let goal: any = form.value.goal
  let visibility: any = form.value.visibility
  let values: any = {}
  if (category.id && goal.id && visibility.id) {
    values.category = { id: category.id, category: category.label }
    values.goal_id = goal.id
    values.caption = form.value.caption
    values.visibility = visibility?.id
    values.is_completed = checked.value
    values.files = form.value.files
    userStore.addCompleteGoal(values)
  }
}
</script>

<template>
  <div class="main-content-container">
    <p class="text-lg font-semibold">Create Your Complete Goals</p>
    <hr />

    <div>
      <p class="font-semibold text-lg text-[#3D8AF7] text-center mb-8">
        Congratulations! You have achieved your weekly goals, let record them!
      </p>

      <!-- Select Resolution's Category -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Select Category</span>
      <component
        :is="BaseSelect"
        v-model="form.category"
        :list="categories"
        border="full"
        class="mb-8"
      ></component>

      <!-- Select Goals Achieved -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Goals Achieved</span>
      <component
        :is="BaseSelect"
        v-model="form.goal"
        :list="goals"
        border="full"
        class="mb-8"
      ></component>

      <!-- Caption -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Caption</span>
      <component :is="BaseInput" v-model="form.caption" border="full" class="mb-8"></component>

      <!-- upload photo -->
      <span class="font-semibold text-[#3D8AF7] block mb-2"
        >Share the photo of your vision here</span
      >
      <label class="btn btn-primary bg-[#3D8AF7] mb-8 block w-[150px]">
        <input type="file" class="pointer-events-none absolute opacity-0" />
        <div class="flex items-center space-x-2">
          <i class="block i-far-arrow-up-from-bracket"></i>
          <span>Choose File</span>
        </div>
      </label>

      <!-- Checkbox to Complete the Goal -->
      <component :is="BaseCheckbox" v-model="checked" label="Complete Goals" class="mb-8" />

      <!-- share with -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Share With</span>
      <component
        :is="BaseSelect"
        v-model="form.visibility"
        :list="privateTypes"
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
