<script setup lang="ts">
import { ref, computed } from 'vue'
import { BaseInput } from '@/components/index'
import UserSneakpeak from '../components/user-sneakpeak.vue'
import { UserModel } from '@/lib/models/UserModel'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import UserRelationItem from '../components/users/user-relation-item.vue'

let relations = ref<any>([])

const userStore = useUserStore()
const currentUser = userStore.currentUser
const route = useRoute()
const { id, type } = route.params

const search = async function () {
  relations.value = (await userStore.getRelations(id as string, type as string)).sort(
    (a: any, b) => {
      if (a.id === currentUser.id) {
        return -1
      }
      return 0
    }
  )
}

let isSupporting = ref(false)

search()

const form = ref({
  key: ''
})
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
      <div class="flex justify-between" v-for="item in relations" :key="item.user_id">
        <UserRelationItem :item="item" :id="(id as string)!" :type="(type as string)!">
        </UserRelationItem>
      </div>
    </div>
  </div>
</template>
