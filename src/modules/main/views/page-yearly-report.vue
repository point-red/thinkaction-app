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
  console.log(`Week ${weekNumber}, Category Index ${categoryIndex}: Target Name - "${targetCategoryName}"`);
  console.log('Week Data Categories:', weekData.categories);

  const categoryCount = weekData.categories?.filter(
    (cat: any) => cat.name === targetCategoryName
  ).length || 0;

  console.log(`Week ${weekNumber}, Category "${targetCategoryName}" Count: ${categoryCount}`);

  const category = weekData.categories?.find((cat: any) => cat.name === targetCategoryName);
  console.log("weekData", weekData);
  console.log("targetCategoryName", targetCategoryName);
  console.log("targetCategoryName", targetCategoryName);
  console.log("category", category);
  

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
    console.log(`YearlyReport.vue (v${componentVersion}) - Unique Categories:`, categories.value);
  }
  await getYearlyReport()
  console.log('Initial reports:', reports.value);
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
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-semibold text-sm">Yearly Report</h3>
        <BaseSelect v-model="year" :list="yearList" class="w-36"></BaseSelect>
      </div>

      <div class="report-container">
        <div class="sticky top-0 bg-white pt-2 pb-2">
          <div class="days-header" :class="`grid-cols-[${categories.length + 1}]`">
            <div class="week-label"></div>
            <div v-for="day in categoryInitial" :key="day" class="day-label">{{ day }}</div>
          </div>
        </div>

        <div class="grid-container">
          <div
            v-for="weekData in reports?.weeks"
            :key="weekData.weekNumber"
            class="grid-row"
            :class="`grid-cols-[${categories.length + 1}]`"
          >
            <div class="week-label text-sm">Week {{ weekData.weekNumber }}</div>
            <div
              v-for="(category, categoryIndex) in categories"
              :key="category"
              class="grid-cell content-center"
              :class="[
                'hover:opacity-80',
                getCellClass(weekData.weekNumber, categoryIndex)
              ]"
            ></div>
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
  @apply text-xs font-medium text-gray-500 whitespace-nowrap pr-8 w-full max-w-sm col-span-2;
}

.grid-cell {
  @apply w-4 h-4 rounded transition-all duration-200 cursor-pointer;
}

/* Custom green shades */
.bg-gray-100 { background-color: #F7FAFC; }

.github-container {
  display: grid;
  grid-template-columns: 200px 1fr; /* Sidebar and main content */
  grid-template-rows: auto 1fr; /* Header and main area */
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  height: 100vh;
}

.main-content-container {
  grid-area: main;
  padding: 20px;
  overflow-y: auto;
}

/* Style the sidebar */
.sidebar {
  grid-area: sidebar;
  background-color: #f0f0f0;
  padding: 20px;
}

/* Style the header */
.header {
  grid-area: header;
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
