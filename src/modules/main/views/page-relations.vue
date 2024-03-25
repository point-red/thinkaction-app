<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput } from '@/components/index'
import { useRoute } from 'vue-router'
import UserRelationItem from '../components/users/user-relation-item.vue'
import client from '@/lib/connection'
import { watchDebounced } from '@vueuse/core'

let relations = ref<any>([])

const route = useRoute()
const { id, type } = route.params

const form = ref({
  key: ''
})

watchDebounced(
  () => form.value.key,
  async () => {
    const {
      data: { data }
    } = await client().get(
      `/users/${route.params.id}/${type}?username=${form.value.key}&page=1&limit=10`
    )
    relations.value = data
  }
)
</script>

<template>
  <div class="main-content-container">
    <!-- SEARCH -->
    <div class="flex gap-2">
      <router-link class="px-2 py-2 my-auto" :to="{ path: '/user/' + id }">
        <i class="i-fas-angle-left text-lg block"></i>
      </router-link>
      <component
        :is="BaseInput"
        v-model="form.key"
        placeholder="Cari pengguna"
        class="border-1 flex-grow border-slate rounded-lg"
      >
      </component>
    </div>

    <!-- LIST SUPPORTER -->
    <div class="flex flex-col gap-2 px-2">
      <div class="flex justify-between" v-for="(item, index) in relations" :key="item.user_id">
        <UserRelationItem
          @update="(u: any) => relations[index] = u"
          :item="item"
          :id="(id as string)!"
          :type="(type as string)!"
        >
        </UserRelationItem>
      </div>
    </div>
  </div>
</template>
