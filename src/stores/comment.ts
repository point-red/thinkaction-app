// { results: [{filter: {query, limit, page}, comments: [(commentIds)]}] }
import { defineStore } from 'pinia'
import client from '@/lib/connection'
import type { ThinkActionComment } from '@/modules/types/think-action'
import { createResultOption } from '@/lib/transform'

export const useCommentStore = defineStore('comment-store', {
  state: () => ({
    results: {} as any,
    comments: {} as { [key: string]: { [key: string]: ThinkActionComment } }
  }),
  actions: {
    async getCommentById(postId: string, id: string) {
      if (this.$state.comments[postId][id]) {
        return this.$state.comments[postId][id]
      }
      const {
        data: { data: comment }
      } = await client().get(`/comments/${id}/reply`)
      this.$state.comments[postId][id] = comment
      return comment
    },
    async postComment(postId: string, message: string, options: any = {}) {
      const preparedComment: any = {
        postId,
        message
      }
      let url = '/comments'
      if (options.commentId) {
        preparedComment.replyTo = options.commentId
        url = '/comments/reply'
      }

      const {
        data: { data: comment }
      } = await client().post(url, preparedComment)

      if (options.commentId) {
        this.comments[postId][options.commentId] = comment.parentComment
        return
      }

      if (!this.comments[postId]) {
        this.comments[postId] = {}
      }
      this.comments[postId][comment._id] = comment

      this.results[postId] = createResultOption(this.results[postId], options, comment._id)
    },
    async getComments(postId: string, filter: any = {}, force = false) {
      const result = this.results[postId]?.find(
        (p: any) => JSON.stringify(p.filter) === JSON.stringify(filter)
      )
      const self = this
      if (result && !filter.commentId && !force) {
        return result.data.map((p: string) => self.comments[postId][p])
      }
      const {
        data: { data: comments }
      } = await client().get(
        `/comments/${filter.commentId ? `${filter.commentId}/reply` : `${postId}`}`
      )

      // Push to results for later use
      this.results[postId] = createResultOption(
        this.results[postId],
        filter,
        comments.map((p: any) => p._id)
      )

      if (!self.comments[postId]) {
        self.comments[postId] = {}
      }
      comments.forEach((comment: any) => {
        self.comments[postId][comment._id] = comment
      })
      return comments
    }
  }
})
