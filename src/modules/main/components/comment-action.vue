<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useCommentStore } from '@/stores/comment'

interface IProps {
  id: string
  postUserId: string
  userId: string
}

const props = withDefaults(defineProps<IProps>(), {})
const emit = defineEmits(['delete'])
const commentStore = useCommentStore()

const userStore = useUserStore()
const currentUser = computed(() => userStore.currentUser)

const deleteModal = ref(false)
const actionToggled = ref(false)
const deleteComment = async () => {
  await commentStore.deleteComment(props.postId, props.id)
  actionToggled.value = false
  deleteModal.value = false
  emit('delete')
}

const openDeleteModal = () => {
  deleteModal.value = true
}

const toggleAction = () => {
  actionToggled.value = !actionToggled.value
}
</script>
<template>
  <div class="ml-auto">
    <div
      v-if="deleteModal"
      class="z-100 fixed w-screen h-screen top-0 left-0 bg-black/20 flex items-center justify-center"
    >
      <div class="bg-white px-6 py-4 flex flex-col gap-4 font-medium rounded-lg">
        <h3 class="text-lg">Are you sure to delete this comment?</h3>
        <div class="flex flex-row gap-2">
          <button
            @click="() => deleteComment(props.id)"
            class="px-3 py-2 rounded-lg text-white bg-red-500 gover:bg-red-600 flex-grow"
          >
            Delete
          </button>
          <button @click="deleteModal = false" class="px-3 py-2 rounded-lg bg-white flex-grow">
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div
      v-click-outside
      @onClickOutside="
            (e: any) => {
              actionToggled = false
            }
          "
      class="ml-auto mb-auto relative"
    >
      <button
        v-if="[props.postUserId, props.userId].includes(currentUser?._id)"
        @click="toggleAction"
      >
        <i class="block w-[25px] h-[25px] i-fas-ellipsis-vertical bg-gray-500"></i>
      </button>
      <div
        v-if="actionToggled"
        class="absolute z-[100] top-8 right-0 shadow-md rounded-sm bg-white flex text-sm md:text-base flex-col"
      >
        <template v-if="[props.postUserId, props.userId].includes(currentUser?._id)">
          <button
            @click="openDeleteModal"
            class="px-4 md:py-2 py-1.5 text-red-500 hover:bg-slate-100 text-left"
          >
            Delete
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
