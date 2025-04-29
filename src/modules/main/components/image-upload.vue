<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { getFile } from '@/lib/connection'

interface IProps {
  previousImages: string[]
}

const props = withDefaults(defineProps<IProps>(), {})
const imageSources = ref<any>([])
const imageObjects = ref<any>([])
const prev = ref<any>([])
const emit = defineEmits(['change', 'remove'])

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  const objects = (files ? Array.from(files) : [])
    .map((file: File) => {
      if (file && file.type.startsWith('image/')) {
        return URL.createObjectURL(file)
      }
      return null
    })
    .filter((f) => !!f)

  imageSources.value.push(...objects)
  imageObjects.value.push(...(files ? Array.from(files) : []))
  emit('change', imageObjects.value)
}

const onRemove = (type: string, index: number) => {
  if (type === 'current') {
    const obj = imageSources.value[index]
    URL.revokeObjectURL(obj)
    imageSources.value.splice(index, 1)
    imageObjects.value.splice(index, 1)
    emit('change', imageObjects.value)
  } else if (type === 'previous') {
    const val = prev.value[index]
    prev.value.splice(index, 1)
    emit('remove', val)
  }
}

onMounted(() => {
  prev.value = Array.isArray(props.previousImages) ? props.previousImages : []
})
watch(
  () => props.previousImages,
  (val) => {
    prev.value = Array.isArray(val) ? val : []
  }
)
</script>
<template>
  <div class="mb-8">
    <label class="btn btn-primary bg-[#3D8AF7] mb-2">
      <input
        type="file"
        @change="onFileChange"
        multiple
        class="pointer-events-none absolute opacity-0"
      />
      <div class="flex items-center space-x-2">
        <i class="block i-far-arrow-up-from-bracket"></i>
        <span>Choose File</span>
      </div>
    </label>
    <div class="flex flex-row items-center gap-2 flex-wrap">
      <div class="relative w-fit h-fit" v-for="(image, index) in prev" :key="index">
        <img :src="getFile(image)" class="rounded-lg object-cover w-32 h-32" />
        <button
          @click="() => onRemove('previous', index)"
          class="absolute top-1 right-1 block w-6 h-6 rounded-lg bg-red-500 text-white font-medium text-lg flex items-center justify-center"
        >
          &times;
        </button>
      </div>
      <div class="relative w-fit h-fit" v-for="(image, index) in imageSources" :key="index">
        <img :src="image" class="rounded-lg object-cover w-32 h-32" />
        <button
          @click="() => onRemove('current', index)"
          class="absolute top-1 right-1 block w-6 h-6 rounded-lg bg-red-500 text-white font-medium text-lg flex items-center justify-center"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>
