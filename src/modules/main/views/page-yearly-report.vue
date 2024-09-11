<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { GoalModel } from '@/lib/models/GoalModel'
import { useUserStore } from '@/stores/user'
import dayjs from 'dayjs'
import { BaseSelect } from '@/components'

const store = useUserStore()

let categories = ref<any>([])
let yearList = ref<any>([])
let reports = ref<any>([])
const year = ref<any>({ id: dayjs().year(), label: `${dayjs().year()}` })

const getYearlyReport = async (year = dayjs().year()) => {
  reports.value = await store.getYearlyReports(year)
  categories.value = new Set(
    Object.values(reports.value)
      .map((r: any) => Object.keys(r))
      .flat()
  )
}

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
  await getYearlyReport()
})

watch(year, async (currentValue) => {
  if (currentValue.id) await getYearlyReport(currentValue.id)
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
              v-for="category in categories"
              :key="category"
              class="basic-table-head text-xs w-28 max-w-[7rem] min-w-[7rem] text-center"
            >
              {{ category }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(report, week) in reports" :key="week" class="basic-table-row h-28">
            <td class="basic-table-body text-sm min-w-[5rem] align-middle">{{ week }}</td>
            <td
              v-for="category in categories"
              :key="category"
              :class="'basic-table-body rounded-lg p-4'"
            >
              <div
                class="w-20 h-20 flex rounded-lg"
                :class="
                  report[category] === undefined
                    ? 'bg-gray-300'
                    : report[category]
                    ? 'bg-sky-300'
                    : 'bg-pink-300'
                "
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
