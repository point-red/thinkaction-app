import { Goals } from '@/modules/data/goals'
import { Users } from '@/modules/data/users'
import type { ThinkActionCategory } from '@/modules/types/think-action'
import { defineStore } from 'pinia'
import moment from 'moment'

export const useUserStore = defineStore('user-store', {
  state: () => ({
    currentUser: {
      ...Users[0],
      email: 'johndoe123@gmail.com'
    },
    userGoals: Goals,
    users: Users,
    resolutions: [],
    weeklyResolutions: [],
    comments: [
      {
        ...Users[0],
        comment_id: 'AIUSVBY4LOW8443Y34H34',
        goal_id: 'GhtHVSB12NHGBSGHHg',
        comment: 'Nice Work!',
        date_time: new Date().toISOString(),
        replies: [
          {
            id: 'GhtHVSB12NHGBSGHgg',
            full_name: 'Jeno',
            avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
            date_time: '2019-08-24T14:15:22Z',
            comment_id: 'SDBYE5RNS5RUYMN5NUR5R55E4',
            parent_id: 'AIUSVBY4LOW8443Y34H34',
            comment:
              'lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet'
          },
          {
            id: 'GhtHVSB12NHGBSGHww',
            full_name: 'Jaemin',
            avatar: 'https://ik.imagekit.io/at4li2svjc/PzV4gC17iYZl_HemoeHWaL',
            date_time: '2019-08-24T14:15:22Z',
            comment_id: 'REHWEHSEB5Y4E5BY45N4',
            parent_id: 'AIUSVBY4LOW8443Y34H34',
            comment:
              'lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet'
          }
        ]
      }
    ]
  }),
  actions: {
    findUserById: function (id: string) {
      return this.$state.users.find((user) => user.id === id)
    },
    getGoalsSorted: function () {
      return this.$state.userGoals.sort((a, b) =>
        moment(a.created_at).isBefore(b.created_at) ? 1 : -1
      )
    },
    getResolutionCategories: async function () {
      const user = this.$state.currentUser
      const resolutions = this.$state.userGoals
        .filter((g) => g.user_id === user.id && g.goal_type === 'resolution') // @ts-ignore
        .reduce((p, c) => (p.includes(c.category) ? p : [...p, c.category]), [])
      return resolutions
    },
    getCurrentGoals: async function () {
      const user = this.$state.currentUser
      const resolutions = this.$state.userGoals.filter((g) => g.user_id === user.id)
      return resolutions
    },
    getResolutions: async function () {
      const user = this.$state.currentUser
      const resolutions = this.$state.userGoals.filter(
        (g) => g.user_id === user.id && g.goal_type === 'resolution'
      )
      return resolutions
    },
    getCommentsByGoalId: function (goalId: string) {
      const comments = this.$state.comments
        .filter((c) => c.goal_id === goalId)
        .sort((a, b) => {
          if (moment(a.date_time).isAfter(b.date_time)) {
            return 1
          }
          return -1
        })
      return comments
    },
    likePost: function (goalId: string) {
      this.$state.userGoals = this.$state.userGoals.map((g) => {
        return g.id === goalId ? { ...g, is_liked_by_user: !g.is_liked_by_user } : g
      })
    },
    addCommentToGoal: function (goalId: string, comment: string, parentId?: string) {
      const id = Math.random().toFixed(32).substring(2)
      if (parentId) {
        const commentable = this.$state.comments.find(
          (c) => c.goal_id === goalId && c.comment_id === parentId
        )
        if (commentable) {
          // @ts-ignore
          commentable.replies.push({
            ...this.$state.currentUser,
            comment,
            comment_id: id,
            date_time: new Date().toISOString()
          })
        }
      } else {
        // @ts-ignore
        this.$state.comments.push({
          ...this.$state.currentUser,
          comment_id: id,
          comment,
          goal_id: goalId,
          replies: []
        })
      }
    },
    addResolutionGoal: function (params: any) {
      // TODO: Add api here:

      const category = params.category as string
      const date_time = params.date_time
      const caption = params.caption
      const files = params.files
      const visibility = params.visibility
      const id = Math.random().toFixed(32).substring(3)

      const goal = {
        id,
        user_id: this.$state.currentUser.id,
        user: {
          username: this.$state.currentUser.username,
          avatar: this.$state.currentUser.avatar
        },
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

      // @ts-ignore
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
        category: category as string,
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
      // @ts-ignore
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
        this.$state.weeklyResolutions[targetGoalIndex] = {
          // @ts-ignore
          ...this.$state.weeklyResolutions[targetGoalIndex], // @ts-ignore
          is_completed, // @ts-ignore
          goal_completed_id: id // @ts-ignore
        }

        // @ts-ignore
        this.$state.userGoals.push(goal)
      }
    }
  }
})
