<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { GoalModel } from '@/lib/models/GoalModel'
import { useUserStore } from '@/stores/user'
import { BaseSelect } from '@/components'
import dayjs from 'dayjs'

const monthList = ref<any>([])
const month = ref<any>({
  id: new Date().getMonth(),
  label: dayjs(new Date(dayjs().year(), new Date().getMonth())).format('MMM YYYY')
})
const store = useUserStore()

let categorized = ref<any>([])
let Categories = ref<any>([])

onMounted(async () => {
  let months = []
  let firstMonth = dayjs(new Date(dayjs().year(), 0, 1)).month()
  while (firstMonth <= dayjs().month() && firstMonth < 11) {
    months.push({
      id: firstMonth,
      label: dayjs(new Date(dayjs().year(), firstMonth)).format('MMM YYYY')
    })
    firstMonth += 1
  }
  monthList.value = months
  Categories.value = await store.getResolutionCategories()
  categorized.value = await GoalModel.generateMonthlyReport(store, new Date().getMonth())
})

watch(month, async (currentValue) => {
  if (currentValue.id)
    categorized.value = await GoalModel.generateMonthlyReport(store, currentValue.id)
})
</script>

<template>
  <div class="main-content-container">
    <h3 class="font-semibold">Monthly Report</h3>
    <hr />
    <div class="flex justify-end">
      <BaseSelect v-model="month" :list="monthList"> </BaseSelect>
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
                :class="( categories.find((c: any) => c.id === id)?.goals?.is_completed === undefined? 'bg-gray-300':( categories.find((c: any) => c.id === id)?.goals?.is_completed ? 'bg-sky-300' : 'bg-pink-300'))"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
