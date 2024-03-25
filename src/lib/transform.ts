export const createResultOption = (result: any, filter: any, item: any) => {
  if (!result) {
    result = []
  }
  const calculatedItem = Array.isArray(item) ? item : [item]
  const resultIndex = result?.findIndex(
    (p: any) => JSON.stringify(p.filter) === JSON.stringify(filter)
  )
  if (resultIndex < 0) {
    result.unshift({
      filter,
      data: calculatedItem
    })
  } else {
    result[resultIndex].data.unshift(...calculatedItem)
  }
  return result
}
