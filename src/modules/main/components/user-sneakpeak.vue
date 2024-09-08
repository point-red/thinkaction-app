<script setup lang="ts">
import { getFile } from '@/lib/connection'

export interface Props {
  id: string
  fullname: string
  username: string
  avatar: string
  supporter: any[]
}

const emit = defineEmits(['add'])

const props = withDefaults(defineProps<Props>(), {
  avatar: '/public/profile.png'
})
</script>

<template>
  <div @click="() => emit('add', props.id)" class="flex mb-5 text-sm">
    <img
      :src="props.avatar ? getFile(props.avatar) : '/public/profile.png'"
      class="w-[60px] h-[60px] object-cover inline-block mr-2 rounded-full"
      alt="user profile"
    />
    <div>
      <p class="font-semibold">{{ props.username }}</p>
      <p class="text-base font-medium">{{ props.fullname }}</p>
      <div v-if="props.supporter?.length" class="flex text-xs">
        <p class="">Supported by {{ props.supporter?.[0]?.username + ' ' + '+' }}</p>
        <p>{{ props.supporter?.length - 1 }} more</p>
      </div>
    </div>
  </div>
</template>
