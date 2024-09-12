<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { BaseSelect } from '@/components'
import dayjs from 'dayjs'

const monthList = ref<any>([])
const month = ref<any>({
  id: new Date().getMonth(),
  label: dayjs(new Date(dayjs().year(), new Date().getMonth())).format('MMM YYYY')
})
const store = useUserStore()

let categories = ref<any>([])
const reports = ref<any>([])

const getMonthlyReport = async (month = dayjs().month()) => {
  reports.value = await store.getMonthlyReports(dayjs().year(), month)
  categories.value = new Set(
    Object.values(reports.value)
      .map((r: any) => Object.keys(r))
      .flat()
  )
}

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
  await getMonthlyReport()
})

watch(month, async (currentValue) => {
  if (currentValue.id) await getMonthlyReport(currentValue.id)
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
              v-for="category in categories"
              :key="category"
              class="basic-table-head text-xs w-28 max-w-[7rem] min-w-[7rem] text-center"
            >
              <p class="max-w-full whitespace-pre-wrap">{{ category }}</p>
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
