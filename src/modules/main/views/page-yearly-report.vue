<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { GoalModel } from '@/lib/models/GoalModel'
import { useUserStore } from '@/stores/user'
import dayjs from 'dayjs'
import { BaseSelect } from '@/components'

const store = useUserStore()

let categorized = ref<any>([])
let Categories = ref<any>([])
let yearList = ref<any>([])
const year = ref<any>({ id: 2023, label: '2023' })

onMounted(async () => {
  let years = []
  let firstYear = dayjs(new Date(2019, 0, 1)).year()
  while (firstYear <= dayjs().year()) {
    years.push({
      id: firstYear,
      label: dayjs(new Date(firstYear, 0)).format('YYYY')
    })
    firstYear += 1
  }
  yearList.value = years
  Categories.value = await store.getResolutionCategories()
  categorized.value = await GoalModel.generateYearlyReport(store, new Date().getFullYear())
})

watch(year, async (currentValue) => {
  if (currentValue._id)
    categorized.value = await GoalModel.generateYearlyReport(store, currentValue._id)
})
</script>

<template>
  <div class="main-content-container">
    <h3 class="font-semibold">Yearly Report</h3>
    <hr />
    <div class="flex justify-end">
      <BaseSelect v-model="year" :list="yearList"> </BaseSelect>
    </div>

    <div class="table-container">
      <table class="table">
        <thead>
          <tr class="basic-table-row">
            <th class="basic-table-head"></th>
            <th
              v-for="category in Categories"
              :key="category"
              class="basic-table-head text-xs w-28 max-w-[7rem] min-w-[7rem] text-center"
            >
              {{ category }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="({ week, categories }, index) in categorized"
            :key="week.start"
            class="basic-table-row h-28"
          >
            <td class="basic-table-body text-sm min-w-[5rem] align-middle">Week {{ index + 1 }}</td>
            <td v-for="{ id } in categories" :key="id" :class="'basic-table-body rounded-lg p-4'">
              <div
                class="w-20 h-20 flex rounded-lg"
                :class="( categories.find((c: any) => c._id === id)?.goals?.is_completed === undefined? 'bg-gray-300':( categories.find((c: any) => c._id === id)?.goals?.is_completed ? 'bg-sky-300' : 'bg-pink-300'))"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
