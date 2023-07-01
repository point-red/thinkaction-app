<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput, BaseCheckbox, BaseSelect } from '@/components/index'

const privacyTypes = [
  { id: 1, label: 'Everyone' },
  { id: 2, label: 'Supporter' },
  { id: 3, label: 'Private' }
]

const categories = [
  { id: 1, label: 'Finance' },
  { id: 2, label: 'Health' },
  { id: 3, label: 'Education' }
]

const goals = [
  { id: 1, label: 'Saving 100k' },
  { id: 2, label: 'Reduce minus eye by 0.5' },
  { id: 3, label: 'Finish redux module' }
]

const checked = ref(false)

const selected = ref({})

const form = ref({
  caption: ''
})
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
        v-model="selected"
        :list="categories"
        border="full"
        class="mb-8"
      ></component>

      <!-- Select Goals Achieved -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Goals Achieved</span>
      <component
        :is="BaseSelect"
        v-model="selected"
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
      <component :is="BaseSelect" v-model="selected" :list="privacyTypes" border="full"></component>

      <!-- button -->
      <div class="flex justify-center space-x-2 mt-8">
        <button class="btn btn-primary bg-[#3D8AF7] px-7">SAVE</button>
        <button class="btn btn-danger">CANCEL</button>
      </div>
    </div>
  </div>
</template>
