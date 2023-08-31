<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GoalModel } from '@/lib/models/GoalModel'
import { useUserStore } from '@/stores/user'
import { Categories } from '@/modules/data/categories'

const store = useUserStore()

let categorized = ref<any>([])

onMounted(async () => {
  categorized.value = await GoalModel.generateYearlyReport(store, new Date().getFullYear())
})

const weekly = ref([
  {
    category_id: 'GhtHVSB12NHGBSGHgg',
    category: 'Finance',
    resolutions: [
      {
        id: 'GhtHVSB12NHGBSGHgg',
        resolution: 'nabung 10 juta',
        due_date: '',
        is_complete: true,
        weekly_goals: [
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-08-07T14:15:22Z',
            is_complete: true,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          },
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-08-14T14:15:22Z',
            is_complete: true,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          },
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-08-21T14:15:22Z',
            is_complete: true,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          },
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-08-28T14:15:22Z',
            is_complete: true,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          },
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-09-05T14:15:22Z',
            is_complete: false,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          }
        ]
      }
    ]
  },
  {
    category_id: 'GhtHVSB12NHGBSGHgg',
    category: 'Education',
    resolutions: [
      {
        id: 'GhtHVSB12NHGBSGHgg',
        resolution: 'nabung 10 juta',
        due_date: '',
        is_complete: false,
        weekly_goals: [
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-08-07T14:15:22Z',
            is_complete: true,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          },
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-08-14T14:15:22Z',
            is_complete: true,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          },
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-08-21T14:15:22Z',
            is_complete: true,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          },
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-08-28T14:15:22Z',
            is_complete: true,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          },
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-09-05T14:15:22Z',
            is_complete: false,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          }
        ]
      }
    ]
  },
  {
    category_id: 'GhtHVSB12NHGBSGHgg',
    category: 'Healthy',
    resolutions: [
      {
        id: 'GhtHVSB12NHGBSGHgg',
        resolution: 'nabung 10 juta',
        due_date: '',
        is_complete: false,
        weekly_goals: [
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-08-07T14:15:22Z',
            is_complete: true,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          },
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-08-14T14:15:22Z',
            is_complete: true,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          },
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-08-21T14:15:22Z',
            is_complete: true,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          },
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-08-28T14:15:22Z',
            is_complete: true,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          },
          {
            id: 'GhtHVSB12NHGBSGHgg',
            due_date: '2019-09-05T14:15:22Z',
            is_complete: false,
            goals: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, amet?'
          }
        ]
      }
    ]
  }
])
</script>

<template>
  <div class="main-content-container">
    <h3 class="font-semibold">Yearly Report</h3>
    <hr />

    <div class="table-container">
      <table class="table">
        <thead>
          <tr class="basic-table-row">
            <th class="basic-table-head"></th>
            <th v-for="category in Categories" :key="category.id" class="basic-table-head">
              {{ category.category }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="({ week, categories }, index) in categorized"
            :key="week.start"
            class="basic-table-row"
          >
            <td class="basic-table-body">Week {{ index + 1 }}</td>
            <td
              v-for="{ id } in Categories"
              :key="id"
              :class="'basic-table-body rounded-lg ' + ( !categories.find((c: any) => c.id === id)?.goals?.length? 'bg-gray-300':( categories.find((c: any) => c.id === id)?.goals?.filter((g: any) => g.is_completed).length ?? 1 > 0 ? 'bg-sky-300' : 'bg-pink-300'))"
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
