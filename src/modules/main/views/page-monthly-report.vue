<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { BaseSelect } from '@/components'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

const monthList = ref<any>([])
const month = ref<any>({
  id: new Date().getMonth(),
  label: dayjs(new Date(dayjs().year(), new Date().getMonth())).format('MMM')
})
const store = useUserStore()

let categories = ref<string[]>([])
let reports = ref<any>(null)

const categoryInitial = computed(() => {
  return categories.value.map(category => category.charAt(0).toUpperCase())
})

const getMonthlyReport = async (year = dayjs().year(), month = dayjs().month()) => {
  reports.value = await store.getMonthlyReports(year, month)
  console.log('Monthly reports:', reports.value);
  // Extract unique categories from user store
  if (store.currentUser && store.currentUser.categoryResolution) {
    categories.value = [...new Set(store.currentUser.categoryResolution.map((cat: any) => cat.name))] as any[];
    console.log('Monthly Report Categories:', categories.value);
  } else {
    categories.value = []; // Ensure categories is initialized even if no user data
  }
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
  const categoryCount = weekData.categories?.filter(
    (cat: any) => cat.name === targetCategoryName
  ).length || 0;

  const category = weekData.categories?.find((cat: any) => cat.name === targetCategoryName);

  if (category?.isComplete === false) {
    return 'bg-red-500';
  } else if (category?.isComplete === true) {
    return 'bg-blue-500';
  }

  return 'bg-gray-100';
};

onMounted(async () => {
  let months = []
  for (let i = 0; i < 12; i++) {
    months.push({
      id: i,
      label: dayjs(new Date(dayjs().year(), i, 1)).format('MMM')
    })
  }
  monthList.value = months
  await getMonthlyReport()
})

watch(month, async (currentValue) => {
  if (currentValue.id !== undefined) {
    await getMonthlyReport(dayjs().year(), currentValue.id)
  }
})

watch(() => store.currentUser, (newUser) => {
  if (newUser && newUser.categoryResolution) {
    categories.value = [...new Set(newUser.categoryResolution.map((cat: any) => cat.name))] as any[];
  }
}, { immediate: true, deep: true })
</script>

<template>
  <div class="main-content-container">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-semibold">Monthly Report</h3>
      <BaseSelect v-model="month" :list="monthList" class="w-36"></BaseSelect>
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
  height: 100%;
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
  @apply col-span-2 text-xs font-medium text-gray-500 whitespace-nowrap;
}

.grid-cell {
  @apply w-6 h-6 rounded transition-all duration-200 cursor-pointer;
}

/* Custom green shades */
.bg-gray-100 { background-color: #F7FAFC; }
</style>
