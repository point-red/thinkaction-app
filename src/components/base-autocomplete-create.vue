<script setup lang="ts">
import type { ThinkActionCategory } from '@/modules/types/think-action'
import { ref, computed, onMounted, watch } from 'vue'

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
  placeholder: 'Choose or type new'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const searchQuery = ref('') // This is bound to the input
const isOpen = ref(false)
const selectedItem = computed({
  get: () => props.modelValue || {},
  set: (value) => emit('update:modelValue', value || {})
})

// Function to set the search query based on the modelValue
const setSearchQueryFromModelValue = (value: any) => {
  if (value && value.label) {
    searchQuery.value = value.label
  } else if (value && typeof value === 'string' && value.trim() !== '') {
    // Handle cases where modelValue might be just a string initially
    // Check if it matches an existing item's label or id
    const matchedItem = props.list.find(item => item.label === value || item.id === value);
    if (matchedItem) {
        searchQuery.value = matchedItem.label;
        // Optionally emit update if modelValue was just a string/id
        if (typeof value !== 'object') {
             emit('update:modelValue', matchedItem)
        }
    } else {
        // If it's a string but doesn't match, keep it as is (potential new value)
        searchQuery.value = value;
    }
  } else {
    searchQuery.value = ''
  }
}

// Initialize searchQuery on mount
onMounted(() => {
  setSearchQueryFromModelValue(props.modelValue)
})

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    setSearchQueryFromModelValue(newValue)
  },
  { deep: true } // Use deep watch
)

const filteredList = computed(() => {
  if (!searchQuery.value) return props.list
  const query = searchQuery.value.toLowerCase()
  const filtered = props.list.filter(item => 
    item.label?.toLowerCase().includes(query)
  )
  
  // If no matches and we have input, create a new option
  if (filtered.length === 0 && searchQuery.value.trim() !== '') {
    return [{
      id: searchQuery.value,
      label: searchQuery.value
    }]
  }
  
  return filtered
})

const clearSelect = () => {
  selectedItem.value = {}
  searchQuery.value = ''
  isOpen.value = false
}

const selectOption = (option: OptionsInterface) => {
  if (!option) return
  selectedItem.value = option
  // Ensure searchQuery is updated when an option is selected
  searchQuery.value = option.label || ''
  isOpen.value = false
}

const onFocus = () => {
  isOpen.value = true
  // No need to set searchQuery here, it should reflect the current state
}

const onBlur = () => {
  setTimeout(() => {
    isOpen.value = false
    // If nothing is selected, but there's text, treat it as a new item
    if (!selectedItem.value?.label && searchQuery.value.trim() !== '') {
       selectOption({
         id: searchQuery.value,
         label: searchQuery.value
       })
    // If something *is* selected, ensure the input matches its label
    } else if (selectedItem.value?.label && searchQuery.value !== selectedItem.value.label) {
       searchQuery.value = selectedItem.value.label
    // Otherwise, clear the search query if nothing is selected and input is empty
    } else if (!selectedItem.value?.label) {
       searchQuery.value = ''
    }
  }, 200) // Delay to allow click event on options to register
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
        <div
          v-for="(option, index) in filteredList"
          :key="index"
          class="list-box-option"
          :class="{
            'list-box-option-active': selectedItem.label === option.label,
            'list-box-option-inactive': selectedItem.label !== option.label,
            'list-box-option-new': !props.list.find(item => item.label === option.label)
          }"
          @click="selectOption(option)"
        >
          <span :class="[selectedItem.label === option.label ? 'font-extrabold' : 'font-normal', 'block']">
            {{ option.label }}
            <i v-if="!props.list.find(item => item.label === option.label)" class="i-fas-plus ml-2 inline-block h-3 w-3" />
          </span>
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
.list-box-option-new {
  @apply bg-green-50 dark:bg-green-900/20;
}
</style>