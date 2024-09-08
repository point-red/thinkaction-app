// { results: [{filter: {query, limit, page}, data: [(postIds)]}] }
import { defineStore } from 'pinia'
import client from '@/lib/connection'
import type { ThinkActionPost } from '@/modules/types/think-action'
import { createResultOption } from '@/lib/transform'

export const usePostStore = defineStore('post-store', {
  state: () => ({
    results: [] as any,
    posts: {} as { [key: string]: ThinkActionPost },
    total: -1
  }),
  actions: {
    addComment(id: string) {
      if (this.$state.posts[id]) {
        this.$state.posts[id].commentCount += 1
      }
      return this.$state.posts[id]
    },
    resetPosts() {
      this.results = []
      this.posts = {}
    },
    async deletePost(id: string) {
      await client().delete(`/posts/${id}`)
      if (this.$state.posts[id]) {
        delete this.$state.posts[id]
      }
      this.resetPosts()
      return true
    },
    async getPostById(id: string) {
      if (this.$state.posts[id]) {
        return this.$state.posts[id]
      }
      const {
        data: { data: post }
      } = await client().get(`/posts/${id}`)
      this.$state.posts[id] = post
      return post
    },
    async getPosts(filter = {}, forceReload = false, countTotal = true) {
      const self = this
      if (forceReload || !countTotal) {
        // self.results = []
        // self.posts = {} as any
      } else {
        const result = this.results.find(
          (p: any) => JSON.stringify(p.filter) === JSON.stringify(filter)
        )
        const self = this
        if (result) {
          return result.data.map((p: string) => self.posts[p])
        }
      }
      const {
        data: { data: posts, total }
      } = await client().get('/posts', filter)

      if (countTotal) {
        this.$state.total = total
      }

      this.results = createResultOption(
        this.results,
        filter,
        posts.map((p: any) => p._id)
      )

      posts.forEach((post: any) => {
        self.posts[post._id] = post
      })
      if (!countTotal) {
        return {
          posts,
          total
        }
      }
      return posts
    },
    likePost: async function (goalId: string) {
      if (this.$state.posts[goalId].likedByCurrent) {
        const {
          data: {
            data: { likeCount, likedByCurrent }
          }
        } = await client().post('/posts/unlike', { postId: goalId })
        this.$state.posts[goalId].likeCount = likeCount
        this.$state.posts[goalId].likedByCurrent = likedByCurrent
      } else {
        const {
          data: {
            data: { likeCount, likedByCurrent }
          }
        } = await client().post('/posts/like', { postId: goalId })
        this.$state.posts[goalId].likeCount = likeCount
        this.$state.posts[goalId].likedByCurrent = likedByCurrent
      }
    }
  }
})
