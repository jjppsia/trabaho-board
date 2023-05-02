type Item = {
  id: string
}

export const findItemIndexById = <TItem extends Item>(
  items: TItem[],
  id: string
) => {
  return items.findIndex((item: TItem) => item.id === id)
}

export const removeItemAtIndex = <TItem>(items: TItem[], index: number) => {
  return [...items.slice(0, index), ...items.slice(index + 1)]
}

export const insertItemAtIndex = <TItem>(
  items: TItem[],
  item: TItem,
  index: number
) => {
  return [...items.slice(0, index), item, ...items.slice(index)]
}

export const moveItem = <TItem>(items: TItem[], from: number, to: number) => {
  const item = items[from]

  return insertItemAtIndex(removeItemAtIndex(items, from), item, to)
}
