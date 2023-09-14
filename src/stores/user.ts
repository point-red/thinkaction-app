import { Goals } from '@/modules/data/goals'
import { Users, UserRelations, uuid } from '@/modules/data/users'
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
    relations: UserRelations,
    resolutions: Goals.filter(
      (g) => g.user_id === Users[0].id && g.goal_type === 'resolutions'
    ).map((g) => ({ goal_id: g.id, caption: g.caption })),
    weeklyResolutions: Goals.filter(
      (g) => g.user_id === Users[0].id && g.goal_type === 'weekly'
    ).map((g) => ({ goal_id: g.id, caption: g.caption })),
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
            (u) => (d.user_id === user_id ? d.related_user_id : d.user_id) === u.id
          )
        })
        .filter(
          (u) => !!u && (u.full_name?.includes(query ?? '') || u?.username?.includes(query ?? ''))
        )
    },
    findGoalById(id: string) {
      return this.$state.userGoals.find((i) => i.id === id)
    },
    deleteGoal(goalId: string) {
      const currentUser = this.$state.currentUser.id
      const goal = this.userGoals.findIndex((g) => g.id === goalId && g.user_id === currentUser)
      if (goal >= 0) {
        this.userGoals.splice(goal, 1)
      }
    },
    isSupporting: function (id: string, currentUserId: string | undefined | null = null) {
      if (!currentUserId) {
        currentUserId = this.$state.currentUser.id
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
    toggleSupport: function (id: string, currentUserId: string | undefined | null = null) {
      if (!currentUserId) {
        currentUserId = this.$state.currentUser.id
      }

      let isReverse = false
      let relationship = this.$state.relations.findIndex(
        (r) => r.user_id === currentUserId && r.related_user_id === id
      )
      if (relationship < 0) {
        relationship = this.$state.relations.findIndex(
          (r) => r.related_user_id === currentUserId && r.user_id === id
        )
        if (relationship >= 0) {
          isReverse = true
        }
      }

      if (relationship >= 0) {
        if (!isReverse) {
          this.$state.relations[relationship].supported_by_current =
            !this.$state.relations[relationship].supported_by_current
        } else {
          this.$state.relations[relationship].supported_by_related =
            !this.$state.relations[relationship].supported_by_related
        }
      } else {
        this.$state.relations.push({
          user_id: currentUserId,
          related_user_id: id,
          supported_by_current: true,
          supported_by_related: false
        })
      }
    },
    findUserById: function (id: string) {
      return this.$state.users.find((user) => user.id === id)
    },
    getGoalsSorted: async function (isCurrent = true) {
      return (isCurrent ? await this.getFeed() : this.$state.userGoals).sort((a, b) =>
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
      if (!comment.length) return
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
      const id = uuid()

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
    editResolutionGoal: function (params: any, id: string) {
      // TODO: Add api here:

      const category = params.category as string
      const date_time = params.date_time
      const caption = params.caption
      const files = params.files
      const visibility = params.visibility

      const currentGoal = this.findGoalById(id)
      if (!currentGoal) {
        return
      }

      const goal = {
        ...currentGoal,
        category,
        caption,
        visibility, // public, supporter, private
        date_time,
        created_at: new Date().toISOString(),
        goal_type: 'resolution'
      }

      // @ts-ignore
      this.$state.userGoals = this.$state.userGoals.map((u) => (u.id === id ? goal : u))
    },
    addWeeklyGoal: function (params: any) {
      const { resolution, date_time, caption, files, visibility, category } = params
      const goal_id = resolution.goal_id
      const id = uuid()

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
    editWeeklyGoal(params: any, id: string) {
      const { resolution, date_time, caption, files, visibility, category } = params
      const goal_id = resolution.goal_id

      const currentGoal = this.findGoalById(id)
      if (!currentGoal) {
        return
      }

      const goal = {
        ...currentGoal,
        caption,
        photos: files,
        visibility, // public, supporter, private
        date_time,
        created_at: new Date().toISOString(),
        goal_type: 'weekly',
        meta: {
          resolution_id: goal_id
        }
      }

      // @ts-ignore
      this.$state.userGoals = this.$state.userGoals.map((u) => (u.id === id ? goal : u))
    },
    getSupportingUsers() {
      const userId = this.$state.currentUser.id
      return this.$state.relations.filter((u) => u.user_id === userId && u.supported_by_current)
    },
    async getFeed() {
      const supportingUsers = this.getSupportingUsers()
      const userId = this.$state.currentUser.id
      return this.$state.userGoals.filter(
        (g) => supportingUsers.some((u) => u.related_user_id === g.user_id) || g.user_id === userId
      )
    },
    async addCompleteGoal(params: any) {
      const { is_completed, goal_id, caption, files, visibility, category } = params
      const goals = await this.getCurrentGoals()
      const targetGoalIndex = goals.findIndex(
        (w: any) =>
          w.id === goal_id &&
          !goals.some((g) => g.goal_type === 'completed' && (g.meta as any)?.goal_id === goal_id)
      )

      const id = uuid()
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
        goal_type: 'completed',
        meta: {
          goal_id: goal_id,
          is_completed
        }
      }
      if (targetGoalIndex >= 0) {
        this.$state.userGoals.push(goal as any)
      }
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
