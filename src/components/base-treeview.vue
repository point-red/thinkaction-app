<script setup lang="ts">
import { ref, watch } from 'vue'

const _isOpen = ref(false)
const content = ref()

const toggleCollapse = () => {
  _isOpen.value = !_isOpen.value
}

const props = withDefaults(
  defineProps<{
    title?: string
    isOpen?: boolean
  }>(),
  { title: '', isOpen: false }
)

watch(
  props,
  () => {
    _isOpen.value = props.isOpen
  },
  { immediate: true }
)
</script>

<template>
  <div class="">
    <button @click="toggleCollapse()" class="btn btn-block space-x-4">
      <slot name="header" :is-open="_isOpen">
        <i
          class="i-fas-angle-right transform-gpu transition-all duration-200"
          :class="{
            'rotate-90': _isOpen
          }"
        ></i>
        <p class="flex-1 text-left">{{ props.title }}</p>
      </slot>
    </button>
    <div v-if="_isOpen" ref="content" class="overflow-hidden px-4">
      <slot></slot>
    </div>
  </div>
</template>
