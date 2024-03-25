import { UserRelations, Users } from '@/modules/data/users'
import type { ThinkActionUser } from '@/modules/types/think-action'

type SupporterType = 'supporters' | 'supporting' | string

class UserModel {
  constructor(props: any) {
    Object.assign(this, props)
  }

  static async findUserById(id: string) {
    return Users.find((u: ThinkActionUser) => u._id === id)
  }

  static async findUserRelations(
    user_id: string,
    type: SupporterType = 'supporters',
    query: string = ''
  ) {
    // API Request to Backend or use dummy data.

    const data = UserRelations.filter((d) => {
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
        return Users.find((u) => (d.user_id === user_id ? d.related_user_id : d.user_id) === u._id)
      })
      .filter(
        (u) => !!u && (u.full_name?.includes(query ?? '') || u?.username?.includes(query ?? ''))
      )
  }
}

export { UserModel }
