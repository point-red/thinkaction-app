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

  if (categoryCount > 0) {
    if (categoryCount >= 8) {
      return 'bg-green-800';
    } else if (categoryCount === 7) {
      return 'bg-green-700';
    } else if (categoryCount === 6) {
      return 'bg-green-600';
    } else if (categoryCount === 5) {
      return 'bg-green-500';
    } else if (categoryCount === 4) {
      return 'bg-green-400';
    } else if (categoryCount === 3) {
      return 'bg-green-300';
    } else if (categoryCount === 2) {
      return 'bg-green-200';
    } else if (categoryCount === 1) {
      return 'bg-green-100';
    }
  }

  return 'bg-gray-100';
};

onMounted(async () => {
  let years = []
  let firstYear = dayjs(new Date(2019, 0, 1)).year()
  while (firstYear <= dayjs().year()) {
    years.push({
      id: firstYear,
      label: dayjs(firstYear).format('YYYY')
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
      <h3 class="font-semibold">Yearly Report</h3>
      <BaseSelect v-model="year" :list="yearList" class="w-36"></BaseSelect>
    </div>

    <div class="report-container">
      <div class="sticky top-0 bg-white pt-2 pb-4 mb-2">
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
          <div class="week-label">Week {{ weekData.weekNumber }}</div>
          <div
            v-for="(category, categoryIndex) in categories"
            :key="category"
            class="grid-cell"
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
  @apply text-xs font-medium text-gray-500 whitespace-nowrap;
}

.grid-cell {
  @apply w-6 h-6 rounded transition-all duration-200 cursor-pointer;
}

/* Custom green shades */
.bg-gray-100 { background-color: #F7FAFC; }
.bg-green-100 { background-color: #E6F4EA; } /* Lightest green */
.bg-green-200 { background-color: #C8E6C9; }
.bg-green-300 { background-color: #A5D6A7; }
.bg-green-400 { background-color: #81C784; }
.bg-green-500 { background-color: #66BB6A; }
.bg-green-600 { background-color: #4CAF50; }
.bg-green-700 { background-color: #388E3C; }
.bg-green-800 { background-color: #1B5E20; } /* Darkest green */
</style>