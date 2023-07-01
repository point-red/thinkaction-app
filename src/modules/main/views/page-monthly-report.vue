<script setup lang="ts">
import { ref } from 'vue'
import { BaseDatepicker, BaseTextarea, BaseSelect } from '@/components/index'

const list = [
  { id: 1, label: 'Everyone' },
  { id: 2, label: 'Supporter' },
  { id: 3, label: 'Private' }
]

const categories = [
  { id: 1, label: 'Finance' },
  { id: 2, label: 'Health' },
  { id: 3, label: 'Education' }
]

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

console.log(`LENGTH ${weekly.value.length}`)
</script>

<template>
  <div class="main-content-container">
    <h3 class="font-semibold">Monthly Report</h3>
    <hr />

    <div class="table-container">
      <table class="table">
        <thead>
          <tr class="basic-table-row">
            <th class="basic-table-head"></th>
            <th v-for="category in weekly" :key="category.category_id" class="basic-table-head">
              {{ category.category }}
            </th>
          </tr>
        </thead>
        <tbody v-for="category in weekly" :key="category.category_id">
          <tr class="basic-table-row">
            <td class="basic-table-body">Week {{ weekly.indexOf(category) + 1 }}</td>
            <td
              v-for="weekly_goal in category.resolutions"
              :key="weekly_goal.id"
              class="basic-table-body {{ weekly_goal.is_complete ? bg-[#3D8AF7] : bg-blueGray }}"
            >
              {{ weekly_goal.is_complete }}
            </td>
            <td class="basic-table-body">Quality Control Specialist</td>
            <td class="basic-table-body">Blue</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
