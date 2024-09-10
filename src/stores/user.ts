import { Goals } from '@/modules/data/goals'
import { Users, UserRelations } from '@/modules/data/users'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import client from '@/lib/connection'
import { googleLogout } from 'vue3-google-login'

export const useUserStore = defineStore('user-store', {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem('auth.user') ?? '{}'),
    token: localStorage.getItem('token'),
    userGoals: Goals,
    users: Users,
    relations: UserRelations,
    resolutions: Goals.filter(
      (g) => g.user_id === Users[0]._id && g.goal_type === 'resolutions'
    ).map((g) => ({ goal_id: g.id, caption: g.caption })),
    weeklyResolutions: Goals.filter(
      (g) => g.user_id === Users[0]._id && g.goal_type === 'weekly'
    ).map((g) => ({ goal_id: g.id, caption: g.caption })),
    comments: [] as any
  }),
  actions: {
    async oauthLogin(credentials: any) {
      try {
        const { data } = await client().post(`/auth/oauth-callback`, credentials)
        if (data.status === 'success') {
          this.token = data.token
          localStorage.setItem('token', data.token)
          const {
            data: { user }
          } = data
          this.currentUser = user
          localStorage.setItem('auth.user', JSON.stringify(user))
          return true
        }
        return false
      } catch (e) {
        return false
      }
    },
    async login(form: any) {
      try {
        const { data } = await client().post(`/users/login`, form)
        if (data.status === 'success') {
          this.token = data.token
          localStorage.setItem('token', data.token)
          const {
            data: { user }
          } = data
          this.currentUser = user
          localStorage.setItem('auth.user', JSON.stringify(user))
          return true as any
        }
      } catch (e: any) {
        return { errors: e.response?.data?.errors ?? 'an error occurred' } as any
      }
      return false as any
    },
    async register(form: any) {
      try {
        const { data } = await client().post(`/users/register`, form)
        if (data.status === 'success') {
          this.token = data.token
          localStorage.setItem('token', data.token)
          const {
            data: { user }
          } = data
          this.currentUser = user
          localStorage.setItem('auth.user', JSON.stringify(user))
          return true
        }
      } catch (e: any) {
        return { errors: e.response?.data?.errors ?? 'an error occurred' }
      }
      return false
    },
    async logout() {
      localStorage.clear()
      this.currentUser = {}
      googleLogout()
    },
    async updateProfile(form: any) {
      try {
        const { data } = await client().patch(`/users`, form)
        if (data.status === 'success') {
          const { data: user } = data
          this.currentUser = user
          localStorage.setItem('auth.user', JSON.stringify(user))
        }
        return true
      } catch (e) {
        return false
      }
    },
    async updatePassword(passwordNew: string, passwordCurrent: string) {
      try {
        const { data } = await client().patch('/users/updateMyPassword', {
          passwordNew,
          passwordCurrent
        })
        if (data.status === 'success' && this.currentUser) {
          this.currentUser.needsPassword = false
          return true
        }
        return false
      } catch (e: any) {
        return e.response.data.errors
      }
    },
    getUserById: async function (_id: string) {
      try {
        const { data } = await client().get(`/users/${_id}`)
        if (data.status === 'success') {
          const { data: user } = data
          if (this.currentUser?._id === user._id) {
            this.currentUser = Object.assign(this.currentUser, user)
            localStorage.setItem('auth.user', JSON.stringify(user))
          }
          return user
        }
        return null
      } catch (e) {
        return null
      }
    },
    getRelations: function (user_id: string, type: string, query: string = '') {
      const data = this.$state.relations.filter((d) => {
        if (type === 'supporters') {
          return (
            (d.user_id === user_id && d.supported_by_related) ||
            (d.related_user_id === user_id && d.supported_by_current)
          )
        } else if (type === 'supporting') {
          return (
            (d.user_id === user_id && d.supported_by_current) ||
            (d.related_user_id === user_id && d.supported_by_related)
          )
        }
        return false
      })
      return data
        .map((d) => {
          return this.$state.users.find(
            (u) => (d.user_id === user_id ? d.related_user_id : d.user_id) === u._id
          )
        })
        .filter(
          (u) => !!u && (u.full_name?.includes(query ?? '') || u?.username?.includes(query ?? ''))
        )
    },
    findGoalById(id: string) {
      return this.$state.userGoals.find((i: any) => i._id === id)
    },
    deleteGoal(goalId: string) {
      const currentUser = this.$state.currentUser._id
      const goal = this.userGoals.findIndex((g) => g.id === goalId && g.user_id === currentUser)
      if (goal >= 0) {
        this.userGoals.splice(goal, 1)
      }
    },
    isSupporting: function (id: string, currentUserId: string | undefined | null = null) {
      if (!currentUserId) {
        currentUserId = this.$state.currentUser._id
      }

      let relationship = this.$state.relations.find(
        (r) => r.user_id === currentUserId && r.related_user_id === id
      )

      if (!relationship) {
        relationship = this.$state.relations.find(
          (r) => r.related_user_id === currentUserId && r.user_id === id
        )
        if (relationship) {
          return relationship.supported_by_related
        }
        return false
      } else {
        return relationship.supported_by_current
      }
    },
    toggleSupport: async function (id: string, isSupporting: boolean = false) {
      const {
        data: { data }
      } = await client().post(`/users/${isSupporting ? 'un' : ''}support`, {
        userId: id
      })

      if (data.type === 'request') {
        data.isRequesting = !isSupporting
      } else {
        data.isSupporting = !isSupporting
      }
      return data
    },
    findUserById: function (id: string) {
      return this.$state.users.find((user) => user._id === id)
    },
    getGoalsSorted: function (isCurrent = true) {
      return (isCurrent ? this.currentUser.categoryResolutions ?? [] : this.$state.userGoals).sort(
        (a: any, b: any) => (dayjs(a.createdDate).isBefore(b.createdDate) ? 1 : -1)
      )
    },
    getResolutionCategories: async function () {
      const user = this.$state.currentUser || (await this.getUserById(this.$state.currentUser?._id))
      const resolutions = (user.categoryResolution ?? [])
        ?.filter(
          (d: any, i: number, arr: any[]) => arr.findIndex((a: any) => a.name === d.name) === i
        )
        ?.map((r: any) => r.name)
      return resolutions
    },
    getYearlyReports: async function (year = dayjs().year()) {
      const { data } = await client().get('/posts/yearly?year=' + year)
      const reports = data.data
      return reports
    },
    getMonthlyReports: async function (year = dayjs().year(), month = dayjs().month()) {
      const { data } = await client().get('/posts/monthly?year=' + year + '&month=' + (month + 1))
      const reports = data.data
      return reports
    },
    getCurrentGoals: async function () {
      const user = this.$state.currentUser
      const resolutions = this.$state.userGoals.filter((g) => g.user_id === user._id)
      return resolutions
    },
    getResolutions: async function () {
      const user = this.$state.currentUser
      const resolutions = user.categoryResolutions
      return resolutions
    },
    getNotifications: async function () {
      const {
        data: { data: notifications }
      } = await client().get('/notifications')
      return notifications
    },
    addResolutionGoal: async function (params: any) {
      const {
        data: { data: post }
      } = await client().post('/posts/resolutions', params)
      // @ts-ignore
      this.$state.userGoals.unshift(post)
    },
    editResolutionGoal: async function (params: any, id: string) {
      // TODO: Add api here:

      const {
        data: { data: post }
      } = await client().patch('/posts/' + id + '/resolutions', params)
      // @ts-ignore
      this.$state.resolutions.push({
        goal_id: post._id,
        caption: params.get('caption')
      })

      // @ts-ignore
      this.$state.userGoals.push(post)
    },
    addWeeklyGoal: async function (params: any) {
      const {
        data: { data: post }
      } = await client().post('/posts/weeklyGoals', params)

      // @ts-ignore
      this.$state.weeklyResolutions.push({
        goal_id: post.id,
        caption: params.get('caption')
      })
      // @ts-ignore
      this.$state.userGoals.push(post)
    },
    editWeeklyGoal: async function (params: any, id: string) {
      const {
        data: { data: post }
      } = await client().patch('/posts/' + id + '/weeklyGoals', params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // @ts-ignore
      this.$state.weeklyResolutions.push({
        goal_id: post.id,
        caption: params.get('caption')
      })
      // @ts-ignore
      this.$state.userGoals.push(post)
    },
    getSupportingUsers() {
      const userId = this.$state.currentUser._id
      return this.$state.relations.filter((u) => u.user_id === userId && u.supported_by_current)
    },
    async getFeed() {
      const supportingUsers = this.getSupportingUsers()
      const userId = this.$state.currentUser._id
      return this.$state.userGoals.filter(
        (g) => supportingUsers.some((u) => u.related_user_id === g.user_id) || g.user_id === userId
      )
    },
    async acceptSupporter(supporterId: string, notificationId: string) {
      return (
        await client().post('/users/request/accept', {
          userId: supporterId,
          notificationId
        })
      ).data
    },
    async rejectSupporter(supporterId: string, notificationId: string) {
      return (
        await client().post('/users/request/reject', {
          userId: supporterId,
          notificationId
        })
      ).data
    },
    async addCompleteGoal(params: any) {
      return await client().post('/posts/completeGoals', params)
    },
    async editCompleteGoal(params: any, id: string) {
      const { is_completed, goal_id, caption, files, visibility, category } = params

      const currentGoal = this.findGoalById(id)
      if (!currentGoal) {
        return
      }

      const goal = {
        ...currentGoal,
        category,
        caption,
        photos: files,
        visibility, // public, supporter, private
        date_time: new Date().toISOString(),
        created_at: new Date().toISOString(),
        goal_type: 'completed',
        meta: {
          goal_id: goal_id,
          is_completed
        }
      }
      this.$state.userGoals = this.$state.userGoals.map((g) => (g.id === id ? goal : g))
    }
  }
})
