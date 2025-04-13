<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { BaseSelect } from '@/components'
import dayjs from 'dayjs'

const store = useUserStore()
const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] // Rearranged to Monday-Sunday
let categories = ref<string[]>(['hahaa']) // Default category
let yearList = ref<any>([])
let reports = ref<any>([])
const year = ref<any>({ id: dayjs().year(), label: `${dayjs().year()}` })

const getYearlyReport = async (year = dayjs().year()) => {
  reports.value = await store.getYearlyReports(year)
  // Extract unique categories from the data
  const extractedCategories = new Set(
    Object.values(reports.value)
      .map((r: any) => Object.keys(r))
      .flat()
  )
  if (extractedCategories.size > 0) {
    categories.value = Array.from(extractedCategories)
  }
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
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-semibold">Yearly Report</h3>
      <BaseSelect v-model="year" :list="yearList" class="w-36"></BaseSelect>
    </div>
    
    <div class="report-container">
      <!-- Headers for days -->
      <div class="sticky top-0 bg-white pt-2 pb-4 mb-2">
        <div class="days-header">
          <div class="week-label"></div>
          <div v-for="day in weekdays" :key="day" class="day-label">{{ day }}</div>
        </div>
      </div>

      <!-- Grid -->
      <div class="grid-container">
        <div v-for="weekNum in 52" :key="weekNum" class="grid-row">
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
  </div>
</template>

<style scoped>
.report-container {
  @apply w-full max-w-[400px] mx-auto bg-white rounded-lg shadow-sm;
  height: calc(100vh - 180px);
  overflow-y: auto;
}

.days-header {
  @apply grid grid-cols-8 gap-1 px-4;
}

.grid-container {
  @apply px-4 pb-4;
}

.grid-row {
  @apply grid grid-cols-8 gap-1 mb-1;
}

.day-label {
  @apply text-center text-xs font-medium text-gray-500;
}

.week-label {
  @apply text-xs font-medium text-gray-500 whitespace-nowrap;
}

.grid-cell {
  @apply w-6 h-6 rounded-[2px] transition-all duration-200 cursor-pointer;
}

/* Custom green shades */
.bg-green-100 { background-color: #e6f5e6; }
.bg-green-200 { background-color: #c2e5c2; }
.bg-green-300 { background-color: #99d699; }
.bg-green-400 { background-color: #70c770; }
.bg-green-500 { background-color: #47b847; }
.bg-green-600 { background-color: #1ea81e; }
</style>
