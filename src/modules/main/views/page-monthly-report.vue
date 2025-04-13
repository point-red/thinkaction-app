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
const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] // Rearranged to Monday-Sunday

const getMonthlyReport = async (month = dayjs().month()) => {
  reports.value = await store.getMonthlyReports(dayjs().year(), month)
  // Extract unique categories from the data, or use default if none found
  const extractedCategories = new Set(
    Object.values(reports.value)
      .map((r: any) => Object.keys(r))
      .flat()
  )
  categories.value = Array.from(extractedCategories).length > 0 
    ? Array.from(extractedCategories) 
    : ['hahaa'] // Default category if none found
}

const getCellClass = (weekData: any, dayIndex: number) => {
  if (!weekData || Object.keys(weekData).length === 0) return 'bg-gray-100'

  for (const [category, timestamp] of Object.entries(weekData)) {
    if (typeof timestamp === 'string') {
      const date = dayjs(timestamp)
      // Convert from dayjs days (Sun=0, Sat=6) to our display days (Mon=0, Sun=6)
      const displayDay = date.day() === 0 ? 6 : date.day() - 1
      
      if (displayDay === dayIndex) {
        return 'bg-green-500'
      }
    }
  }
  
  return 'bg-gray-100'
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
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-semibold">Weekly Report</h3>
      <BaseSelect v-model="month" :list="monthList" class="w-36"></BaseSelect>
    </div>

    <div class="report-grid">
      <!-- Days Header -->
      <div class="grid-row mb-4">
        <div class="week-label"></div>
        <div v-for="day in weekdays" :key="day" class="day-label">{{ day }}</div>
      </div>

      <!-- Grid -->
      <div v-for="weekNum in 5" :key="weekNum" class="grid-row">
        <div class="week-label">Week {{ weekNum }}</div>
        <div v-for="(day, dayIndex) in weekdays" :key="day" 
          class="grid-cell" 
          :class="[
            'hover:opacity-80',
            getCellClass(reports[`Week ${weekNum}`], dayIndex)
          ]">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-grid {
  @apply w-full max-w-[340px] mx-auto bg-white p-4 rounded-lg shadow-sm;
}

.grid-row {
  @apply grid grid-cols-8 gap-1 mb-1;
}

.day-label {
  @apply text-center text-xs font-medium text-gray-500;
}

.week-label {
  @apply text-xs font-medium text-gray-500;
}

.grid-cell {
  @apply w-6 h-6 rounded-[2px] transition-all duration-200 cursor-pointer;
}

/* Custom green shades to match the image exactly */
.bg-green-100 { background-color: #e6f5e6; }
.bg-green-200 { background-color: #c2e5c2; }
.bg-green-300 { background-color: #99d699; }
.bg-green-400 { background-color: #70c770; }
.bg-green-500 { background-color: #47b847; }
.bg-green-600 { background-color: #1ea81e; }
</style>
