<script setup lang="ts">
import { ref, computed } from 'vue'

export interface OptionsInterface {
  label: string
  [key: string]: any
}

export interface Props {
  modelValue: any
  placeholder?: string
  border?: 'full' | 'simple' | 'none'
  list: OptionsInterface[]
  isError?: boolean
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  border: 'simple',
  placeholder: 'Choose one'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const searchQuery = ref('')
const isOpen = ref(false)
const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const filteredList = computed(() => {
  if (!searchQuery.value) return props.list
  const query = searchQuery.value.toLowerCase()
  return props.list.filter(item => 
    item.label.toLowerCase().includes(query)
  )
})

const clearSelect = () => {
  selectedItem.value = {}
  searchQuery.value = ''
  isOpen.value = false
}

const selectOption = (option: OptionsInterface) => {
  selectedItem.value = option
  searchQuery.value = option.label
  isOpen.value = false
}

const onFocus = () => {
  isOpen.value = true
  if (selectedItem.value?.label) {
    searchQuery.value = selectedItem.value.label
  }
}

const onBlur = () => {
  setTimeout(() => {
    isOpen.value = false
    if (selectedItem.value?.label) {
      searchQuery.value = selectedItem.value.label
    } else {
      searchQuery.value = ''
    }
  }, 200)
}
</script>

<template>
  <div class="list-box">
    <div
      class="list-box-button"
      :class="{
        'is-error': props.isError,
        border: props.border === 'full',
        'border-b': props.border === 'simple'
      }"
    >
      <input
        type="text"
        v-model="searchQuery"
        :placeholder="placeholder"
        @focus="onFocus"
        @blur="onBlur"
        class="w-full bg-transparent outline-none"
        :class="{ 'text-slate-400': !selectedItem.label }"
      />
      <span class="list-box-button-icon">
        <i
          v-if="!selectedItem.label"
          class="i-fas-angle-down block h-5 w-5 text-gray-400"
        ></i>
        <i
          v-else
          class="i-fas-xmark block h-5 w-5 text-gray-400"
          @click.stop="clearSelect()"
        ></i>
      </span>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-show="isOpen" class="list-box-options">
        <template v-if="filteredList.length">
          <div
            v-for="(option, index) in filteredList"
            :key="index"
            class="list-box-option"
            :class="{
              'list-box-option-active': selectedItem.label === option.label,
              'list-box-option-inactive': selectedItem.label !== option.label
            }"
            @click="selectOption(option)"
          >
            <span :class="[selectedItem.label === option.label ? 'font-extrabold' : 'font-normal', 'block']">
              {{ option.label }}
            </span>
          </div>
        </template>
        <div v-else class="list-box-option list-box-option-inactive">
          No results found
        </div>
      </div>
    </transition>

    <p class="text-xs mt-1 ml-2 text-red-5" v-if="isError">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style lang="postcss" scoped>
.list-box {
  @apply relative w-full cursor-pointer;
}
.list-box-button {
  @apply relative w-full dark:bg-slate-800 dark:border-slate-600 bg-white py-2 pl-3 pr-10 text-left focus-visible:border-indigo-500 sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-orange-300;
}
.list-box-button.is-error {
  @apply dark:border-red-600 border-red-400;
}
.list-box-button-icon {
  @apply absolute inset-y-0 right-0 flex items-center pr-2;
}
.list-box-options {
  @apply absolute dark:bg-slate-800 dark:border-slate-600 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm focus:outline-none z-50;
}
.list-box-option-active {
  @apply bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100;
}
.list-box-option-inactive {
  @apply text-gray-900 dark:text-gray-300;
}
.list-box-option {
  @apply relative select-none py-2 pl-4 pr-4 hover:bg-slate-100 dark:hover:bg-slate-700;
}
</style>
