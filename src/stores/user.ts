import { Goals } from '@/modules/data/goals'
import type { ThinkActionCategory } from '@/modules/types/think-action'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user-store', {
  state: () => ({
    currentUser: {
      id: 'GhtHVSB12NHGBSGHHg',
      full_name: 'Fitri Andriyani',
      name: 'Fitri',
      username: 'fitri07',
      avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
      bio: 'nothing to see here',
      is_private: false,
      is_supporting: false,
      goals_performance: 80,
      supporting_count: 100,
      supporter_count: 100
    },
    userGoals: Goals,
    resolutions: [],
    weeklyResolutions: []
  }),
  actions: {
    addResolutionGoal: function (params: any) {
      // TODO: Add api here:

      const category = params.category as ThinkActionCategory
      const date_time = params.date_time
      const caption = params.caption
      const files = params.files
      const visibility = params.visibility
      const id = Math.random().toFixed(32).substring(3)

      const goal = {
        id,
        user_id: this.$state.currentUser.id,
        user: this.$state.currentUser,
        category,
        caption,
        photos: files,
        is_liked_by_user: false,
        cheers_count: 0,
        comments_count: 0,
        visibility, // public, supporter, private
        date_time,
        created_at: new Date().toISOString(),
        goal_type: 'resolution',
        meta: {}
      }
      // @ts-ignore
      this.$state.resolutions.push({
        goal_id: id,
        caption: caption
      })

      this.$state.userGoals.push(goal)
    },
    addWeeklyGoal: function (params: any) {
      const { resolution, date_time, caption, files, visibility, category } = params
      const goal_id = resolution.goal_id

      const id = Math.random().toFixed(32).substring(3)

      const goal = {
        id,
        user_id: this.$state.currentUser.id,
        user: this.$state.currentUser,
        category,
        caption,
        photos: files,
        is_liked_by_user: false,
        cheers_count: 0,
        comments_count: 0,
        visibility, // public, supporter, private
        date_time,
        created_at: new Date().toISOString(),
        goal_type: 'weekly',
        meta: {
          resolution_id: goal_id
        }
      }

      // @ts-ignore
      this.$state.weeklyResolutions.push({
        goal_id: id,
        caption: caption
      })

      this.$state.userGoals.push(goal)
    },
    addCompleteGoal(params: any) {
      const { is_completed, goal_id, caption, files, visibility, category } = params
      const targetGoalIndex = this.$state.weeklyResolutions.findIndex(
        (w: any) => w.goal_id === goal_id
      )
      const id = Math.random().toFixed(32).substring(3)
      const goal = {
        id,
        user_id: this.$state.currentUser.id,
        user: this.$state.currentUser,
        category,
        caption,
        photos: files,
        is_liked_by_user: false,
        cheers_count: 0,
        comments_count: 0,
        visibility, // public, supporter, private
        date_time: new Date().toISOString(),
        created_at: new Date().toISOString(),
        goal_type: 'complete',
        meta: {
          week_id: goal_id,
          is_completed
        }
      }
      if (targetGoalIndex >= 0) {
        // @ts-ignore
        this.$state.weeklyResolutions[targetGoalIndex] = { // @ts-ignore
          ...this.$state.weeklyResolutions[targetGoalIndex], // @ts-ignore
          is_completed, // @ts-ignore
          goal_completed_id: id // @ts-ignore
        }
        this.$state.userGoals.push(goal)
      }
    }
  }
})
