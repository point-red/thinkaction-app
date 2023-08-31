import { defineStore } from 'pinia'
import { Categories } from '@/modules/data/categories'

export const useSystemStore = defineStore('system', {
  state: () => ({
    applicationFrame: 'default',
    categories: Categories
  }),
  actions: {}
})
