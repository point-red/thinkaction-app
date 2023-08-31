<script setup lang="ts">
import type { ThinkActionCategory } from '@/modules/types/think-action'

export interface Props {
  resolution_categories?: Array<ThinkActionCategory>
  selected_category_id?: string
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['select'])
</script>

<template>
  <div>
    <div class="flex max-w-full items-center gap-2 overflow-auto py-3">
      <button v-if="!selected_category_id" class="btn text-xs btn-info overflow-hidden">All</button>
      <button v-else class="btn text-xs btn-outline-info" @click="emit('select', '')">All</button>
      <div v-for="c in resolution_categories" :key="c.id">
        <button v-if="c.id === selected_category_id" class="btn text-xs btn-info overflow-hidden">
          {{ c.category }}
        </button>
        <button v-else class="btn text-xs btn-outline-info" @click="emit('select', c.id)">
          {{ c.category }}
        </button>
      </div>
    </div>
  </div>
</template>
