import dayjs from 'dayjs'

class GoalModel {
  static async generateMonthlyReport(userStore: any, month: number) {
    let goals = await userStore.getCurrentGoals()
    goals = goals.filter((g: any) => dayjs(g.created_at).year() === dayjs().year())
    const categories = await userStore.getResolutionCategories()

    const weeks = []
    let firstDay = dayjs().month(month).startOf('month')
    const lastDay = dayjs().month(month).endOf('month')

    while (firstDay.date() < lastDay.date() && firstDay.month() === lastDay.month()) {
      let endOfWeek = firstDay.clone().endOf('week')
      if (endOfWeek.month() !== month) {
        endOfWeek = lastDay.clone()
      }
      weeks.push({
        start: firstDay.toDate(),
        end: endOfWeek.toDate()
      })
      firstDay = endOfWeek.clone().add(1, 'days')
    }

    const converted = function (date: any) {
      if (typeof date === 'string') {
        if (isNaN(Date.parse(date))) {
          date = date.split('-').reverse().join('-')
        }
      }
      return date
    }

    const allTypes = function (filteredGoals: any, startDate: any, endDate: any) {
      const combinedGoals = filteredGoals.map((f: any) => {
        const g = goals.find(
          (g: any) =>
            g.meta?.goal_id === f._id && g.meta?.is_completed && g.goal_type === 'completed'
        )
        return {
          ...f,
          ended_at: g ? g.created_at : null
        }
      })
      for (const item of combinedGoals) {
        if (item.date_time) {
          if (
            dayjs(converted(item.date_time)).isSame(endDate) ||
            dayjs(converted(item.date_time)).isAfter(endDate)
          ) {
            if (
              dayjs(converted(item.created_at)).isSame(endDate) ||
              dayjs(converted(item.created_at)).isBefore(endDate) ||
              dayjs(converted(item.date_time)).isSame(endDate) ||
              dayjs(converted(item.date_time)).isBefore(endDate)
            ) {
              return {
                is_completed: item.ended_at ? true : false
              }
            }
          }
        }
      }
      return {}
    }

    const items = []
    for (const { start, end } of weeks) {
      items.push({
        week: {
          start,
          end
        },
        categories: categories.map((category: string) => {
          return {
            id: category,
            category,
            goals: allTypes(
              goals.filter((g: any) => g.category === category),
              start,
              end
            )
          }
        })
      })
    }

    return items
  }

  static async generateYearlyReport(userStore: any, year = new Date().getFullYear()) {
    const goals = await userStore.getCurrentGoals()
    // goals = goals.filter((g: any) => g.goal_type === 'completed')
    const categories = await userStore.getResolutionCategories()
    const weeks = []
    let firstDay = dayjs().year(year).month(0).startOf('year')
    const lastDay = dayjs().year(year).month(11).endOf('year')
    while (lastDay.year() !== firstDay.year()) {
      lastDay.subtract(1, 'day')
    }

    while (
      (firstDay.month() < lastDay.month() ||
        (firstDay.date() < lastDay.date() && firstDay.month() === lastDay.month())) &&
      firstDay.year() === lastDay.year()
    ) {
      let endOfWeek = firstDay.clone().endOf('week')
      if (endOfWeek.year() !== year) {
        endOfWeek = lastDay.clone()
      }
      weeks.push({
        start: firstDay.toDate(),
        end: endOfWeek.toDate()
      })
      firstDay = endOfWeek.clone().add(1, 'days')
    }

    const converted = function (date: any) {
      if (typeof date === 'string') {
        if (isNaN(Date.parse(date))) {
          date = date.split('-').reverse().join('-')
        }
      }
      return date
    }

    const allTypes = function (filteredGoals: any, startDate: any, endDate: any) {
      const combinedGoals = filteredGoals.map((f: any) => {
        const g = goals.find(
          (g: any) =>
            g.meta?.goal_id === f._id && g.meta?.is_completed && g.goal_type === 'completed'
        )
        return {
          ...f,
          ended_at: g ? g.created_at : null
        }
      })
      for (const item of combinedGoals) {
        if (item.date_time) {
          if (
            dayjs(converted(item.date_time)).isSame(endDate) ||
            dayjs(converted(item.date_time)).isAfter(endDate)
          ) {
            if (
              dayjs(converted(item.created_at)).isSame(endDate) ||
              dayjs(converted(item.created_at)).isBefore(endDate) ||
              dayjs(converted(item.date_time)).isSame(endDate) ||
              dayjs(converted(item.date_time)).isBefore(endDate)
            ) {
              return {
                is_completed: item.ended_at ? true : false
              }
            }
          }
        }
      }
      return {}
    }

    const items = []
    for (const { start, end } of weeks) {
      items.push({
        week: {
          start,
          end
        },
        categories: categories.map((category: string) => {
          return {
            id: category,
            category,
            goals: allTypes(
              goals.filter((g: any) => g.category === category),
              start,
              end
            )
          }
        })
      })
    }

    return items
  }
}

export { GoalModel }
