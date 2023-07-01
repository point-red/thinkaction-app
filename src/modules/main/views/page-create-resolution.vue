<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput, BaseDatepicker, BaseTextarea, BaseSelect } from '@/components/index'

const list = [
  { id: 1, label: 'Everyone' },
  { id: 2, label: 'Supporter' },
  { id: 3, label: 'Private' }
]

const selected = ref({})

const date = ref()
const text = ref('')
const form = ref({
  category: ''
})
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
        :is="BaseInput"
        v-model="form.category"
        placeholder="Finance"
        border="full"
        class="mb-8"
      ></component>

      <!-- due date input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Due Date</span>
      <component :is="BaseDatepicker" v-model="date" border="full" class="mb-8" />

      <!-- resolution input -->
      <span class="font-semibold text-[#3D8AF7] block mb-2">Resolution</span>
      <component :is="BaseTextarea" v-model="text" border="simple" class="mb-8"></component>

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
      <component :is="BaseSelect" v-model="selected" :list="list" border="full"></component>

      <!-- button -->
      <div class="flex justify-center space-x-2 mt-8">
        <button class="btn btn-primary bg-[#3D8AF7] px-7">SAVE</button>
        <button class="btn btn-danger">CANCEL</button>
      </div>
    </div>
  </div>
</template>
