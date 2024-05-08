export type ThinkActionUser = {
  [x: string]: any | number | undefined
  photo?: string
  id?: string
  _id?: string
  full_name?: string
  fullname?: string
  name?: string
  username?: string
  bio?: string
  avatar?: string
  is_private?: boolean
  isSupporting?: boolean
  goals_performance?: number
  supporting_count?: number
  supportingCount?: number
  supporterCount?: number
  supporter_count?: number
}

export type ThinkActionCategory = {
  id: number | string
  category: string
}

export type ThinkActionComment = {
  id: string
  full_name: string
  avatar: string
  date_time: string
  comment: string
  comment_id: string
  parent_id?: string
  goal_id?: string
  replies: ThinkActionComment[]
}

export type ThinkActionPost = {
  _id: string
  userId: string
  categoryResolutionId: string
  type: string
  caption: string
  photo: string[]
  likeCount: number
  commentCount: number
  dueDate: string
  updatedDate: null
  shareWith: string
  isComplete: false
  createdDate: string
  userInfo: ThinkActionUser
  likedByCurrent: boolean
}

export type ThinkActionGoal = {
  id: string
  _id: string
  user: ThinkActionUser
  user_id: string
  category: ThinkActionCategory | string
  resolution: string
  name: string
  caption: string
  photos?: string[]

  photo?: string[]
  is_liked_by_user: boolean
  cheers_count: number
  comments_count: number
  meta?: any
  goal_type?: string
  date_time?: string
  created_at?: string
  createdDate?: string
}
