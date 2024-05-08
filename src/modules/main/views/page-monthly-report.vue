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
const reports = ref<any>([])

const getMonthlyReport = async (month = dayjs().month()) => {
  const monthlyReports = await store.getMonthlyReports(dayjs().year(), month)
  reports.value = Object.keys(monthlyReports)
    .filter((y) => y.startsWith('week'))
    .reduce(
      (prev, key) => [
        {
          week: 'Week ' + key.replace('week', ''),
          report: monthlyReports[key]
        },
        ...prev
      ],
      [] as any
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
  Categories.value = await store.getResolutionCategories()
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
            v-for="({ week, report }, index) in reports"
            :key="week.start"
            class="basic-table-row h-28"
          >
            <td class="basic-table-body text-sm min-w-[5rem] align-middle">Week {{ index + 1 }}</td>
            <td
              v-for="category in Categories"
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
