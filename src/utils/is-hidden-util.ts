import { DragItem } from '../types'

export const isHidden = (
  itemType: string,
  id: string,
  draggedItem: DragItem | null,
  isPreview?: boolean
): boolean => {
  return Boolean(
    !isPreview &&
      draggedItem &&
      draggedItem.type === itemType &&
      draggedItem.id === id
  )
}
