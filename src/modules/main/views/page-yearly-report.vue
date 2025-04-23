<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { BaseSelect } from '@/components'
import dayjs from 'dayjs'

const store = useUserStore()

const componentVersion = '1.2'; // Add version number
let categories = ref<string[]>([])
let yearList = ref<any>([])
let reports = ref<any>(null)
const year = ref<any>({ id: dayjs().year(), label: `${dayjs().year()}` })


// Weeks to show labels for - more sparse to fit on one page
const labeledWeeks = [1, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52]

// Get all 52 weeks
const getWeeksData = () => {
  return Array.from({length: 52}, (_, i) => ({
    weekNumber: i + 1,
    categories: categories.value.map(cat => ({
      name: cat,
      isComplete: false
    }))
  }))
}

const categoryInitial = computed(() => {
  return categories.value.map(category => category.charAt(0).toUpperCase())
})

const getYearlyReport = async (year = dayjs().year()) => {
  reports.value = await store.getYearlyReports(year)
}

const getCellClass = (weekNumber: number, categoryIndex: number) => {
  if (!reports.value?.weeks) {
    return 'bg-gray-100';
  }

  const weekData = reports.value.weeks.find((week: any) => week.weekNumber === weekNumber);

  if (!weekData) {
    return 'bg-gray-100';
  }

  const targetCategoryName = categories.value[categoryIndex];
  // console.log(`Week ${weekNumber}, Category Index ${categoryIndex}: Target Name - "${targetCategoryName}"`);
  // console.log('Week Data Categories:', weekData.categories);

  const categoryCount = weekData.categories?.filter(
    (cat: any) => cat.name === targetCategoryName
  ).length || 0;

  // console.log(`Week ${weekNumber}, Category "${targetCategoryName}" Count: ${categoryCount}`);

  const category = weekData.categories?.find((cat: any) => cat.name === targetCategoryName);
  // console.log("weekData", weekData);
  // console.log("targetCategoryName", targetCategoryName);
  // console.log("targetCategoryName", targetCategoryName);
  // console.log("category", category);


  if (category?.isComplete === false) {
    return 'bg-red-500';
  } else if (category?.isComplete === true) {
    return 'bg-blue-500';
  }

  return 'bg-gray-100';
};

onMounted(async () => {
  let years = []
  let firstYear = 2021
  let lastYear = 2025
  while (firstYear <= lastYear) {
    years.push({
      id: firstYear,
      label: `${firstYear}`
    })
    firstYear += 1
  }
  yearList.value = years
  if (store.currentUser && store.currentUser.categoryResolution) {
    // Use a Set to get unique category names
    categories.value = [...new Set(store.currentUser.categoryResolution.map((cat: any) => cat.name))] as any[];
    // console.log(`YearlyReport.vue (v${componentVersion}) - Unique Categories:`, categories.value);
  }
  await getYearlyReport()
  // console.log('Initial reports:', reports.value);
})

watch(() => store.currentUser, (newUser) => {
  if (newUser && newUser.categoryResolution) {
    // Use a Set to get unique category names when user data changes
    categories.value = [...new Set(newUser.categoryResolution.map((cat: any) => cat.name))] as any[];
  }
}, { immediate: true, deep: true })

watch(year, async (currentValue) => {
  if (currentValue.id) await getYearlyReport(currentValue.id)
})
</script>


<template>
  <div class="main-content-container">
    <div class="flex justify-between items-center mb-2">
      <h3 class="font-semibold text-sm">Yearly Report</h3>
      <BaseSelect v-model="year" :list="yearList" class="w-36"></BaseSelect>
    </div>

    <div class="report-container">
      <!-- Header with category names -->
      <div class="sticky top-0 bg-white pt-1 pb-1">
        <div class="days-header">
          <div class="week-column"></div>
          <div v-for="category in categories" :key="category" class="category-column">
            {{ category }}
          </div>
        </div>
      </div>

      <!-- Grid content -->
      <div class="grid-content">
        <div v-for="week in reports?.weeks" :key="week.weekNumber" class="week-row">
          <!-- Week label - display only on certain weeks -->
          <div class="week-column">
            <template v-if="labeledWeeks.includes(week.weekNumber)">
              W. {{ week.weekNumber }}
            </template>
          </div>
          
          <!-- Category cells -->
          <div v-for="(category, categoryIndex) in categories" :key="category" 
            class="category-cell"
            :class="getCellClass(week.weekNumber, categoryIndex)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-container {
  @apply w-full max-w-3xl mx-auto bg-white rounded-lg shadow-sm px-4 pb-4;
  max-height: 95vh;
  overflow-y: auto;
}

.days-header {
  @apply flex border-b border-gray-200 pb-1;
}

.grid-content {
  @apply pt-1;
}

.week-row {
  @apply flex items-center;
  height: 4px;
  margin-bottom: 4px;
}

.week-column {
  @apply text-xs font-medium text-gray-500 pr-1;
  min-width: 40px;
  width: 40px;
}

.category-column {
  @apply flex-1 text-center text-xs font-medium text-gray-600;
  min-width: 60px;
}

.category-cell {
  @apply flex-1 mx-1 rounded-sm transition-all duration-200;
  min-width: 60px;
  height: 5px; 
}

/* Color classes */
.bg-gray-100 {
  background-color: #F3F4F6;
}

.bg-blue-500 {
  background-color: #3B82F6;
}

.bg-red-500 {
  background-color: #EF4444;
}

.main-content-container {
  @apply p-2;
  max-width: 100%;
  overflow-x: auto;
}
</style>