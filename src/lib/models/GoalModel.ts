import { Categories } from '@/modules/data/categories'
import moment from 'moment'

class GoalModel {
  static async generateMonthlyReport(userStore: any, month: number) {
    const goals = userStore.weeklyResolutions
      .map((w: any) => {
        return {
          targetGoal: userStore.userGoals.find((g: any) => g.id === w.goal_id),
          is_completed: w.is_completed ?? false
        }
      })
      .filter((a: any) => !!a.targetGoal)
      .map((a: any) => {
        return { ...a.targetGoal, is_completed: a.is_completed }
      })

    const weeks = []
    let firstDay = moment().month(month).startOf('month')
    const lastDay = moment().month(month).endOf('month')

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

    const items = []
    for (const { start, end } of weeks) {
      items.push({
        week: {
          start,
          end
        },
        categories: Categories.map(({ category, id }) => {
          return {
            id,
            category,
            goals: goals.filter(
              (g: any) =>
                g.category.id === id &&
                moment(converted(g.date_time)).isSameOrAfter(start) &&
                moment(converted(g.date_time)).isSameOrBefore(end)
            )
          }
        })
      })
    }

    return items
  }

  static async generateYearlyReport(userStore: any, year = new Date().getFullYear()) {
    const goals = userStore.weeklyResolutions
      .map((w: any) => {
        return {
          targetGoal: userStore.userGoals.find((g: any) => g.id === w.goal_id),
          is_completed: w.is_completed ?? false
        }
      })
      .filter((a: any) => !!a.targetGoal)
      .map((a: any) => {
        return { ...a.targetGoal, is_completed: a.is_completed }
      })

    const weeks = []
    let firstDay = moment().year(year).month(0).startOf('year')
    const lastDay = moment().year(year).month(11).endOf('year')

    while (firstDay.date() < lastDay.date() && firstDay.year() === lastDay.year()) {
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

    const items = []
    for (const { start, end } of weeks) {
      items.push({
        week: {
          start,
          end
        },
        categories: Categories.map(({ category, id }) => {
          return {
            id,
            category,
            goals: goals.filter(
              (g: any) =>
                g.category.id === id &&
                moment(converted(g.date_time)).isSameOrAfter(start) &&
                moment(converted(g.date_time)).isSameOrBefore(end)
            )
          }
        })
      })
    }

    return items
  }
}

export { GoalModel }
