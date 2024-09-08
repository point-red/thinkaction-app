<script setup lang="ts">
export interface Props {
  resolution_categories?: Array<string>
  selected_category_id?: string
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['select'])
</script>

<template>
  <div>
    <div class="flex max-w-full items-center gap-2 overflow-auto py-3">
      <button v-if="!props.selected_category_id" class="btn text-xs btn-info overflow-hidden">
        All
      </button>
      <button v-else class="btn text-xs btn-outline-info" @click="emit('select', '')">All</button>
      <div
        v-for="(c, index) in [...(props.resolution_categories as any)]?.sort((a, b) => a.label.localeCompare(b.label))"
        :key="index"
      >
        <button
          v-if="c.id === props.selected_category_id"
          class="btn text-xs btn-info overflow-hidden"
        >
          {{ c.label }}
        </button>
        <button v-else class="btn text-xs btn-outline-info" @click="emit('select', c.id)">
          {{ c.label }}
        </button>
      </div>
    </div>
  </div>
</template>
