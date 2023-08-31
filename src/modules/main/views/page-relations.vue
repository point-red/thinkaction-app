<script setup lang="ts">
import { ref, computed } from 'vue'
import { BaseInput } from '@/components/index'
import UserSneakpeak from '../components/user-sneakpeak.vue'
import { UserModel } from '@/lib/models/UserModel'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'

let relations = ref<any>([])

const userStore = useUserStore()
const currentUser = userStore.currentUser
const route = useRoute()
const { id, type } = route.params

const search = async function () {
  relations.value = await UserModel.findUserRelations(id as string, type as string)
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
        <router-link :to="{ path: `/user/${item.id}` }">
          <UserSneakpeak
            :id="item.id"
            :fullname="item.full_name"
            :username="item.username"
            :avatar="item.avatar"
            :supporter="item.supporter"
          ></UserSneakpeak>
        </router-link>
        <div class="flex space-x-2">
          <button
            v-if="isSupporting"
            @click="isSupporting = false"
            class="bg-slate-400 h-[40px] rounded-lg mt-6 px-3 text-white font-semibold"
          >
            Supporting
          </button>
          <button
            v-if="!isSupporting"
            @click="isSupporting = true"
            class="bg-[#3D8AF7] h-[40px] rounded-lg mt-6 px-6 text-white font-semibold"
          >
            Support
          </button>
          <button
            v-if="type === 'supporters' && id === currentUser?.id"
            class="bg-slate-400 h-[40px] rounded-lg mt-6 px-3 text-white font-semibold"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
