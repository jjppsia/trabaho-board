import throttle from 'lodash.throttle'
import { useRef } from 'react'
import { useDrop } from 'react-dnd'

import AddNewItem from '@/components/add-new-item'
import Card from '@/components/card'
import { useDragItem } from '@/hooks/use-drag-item'
import { addTask, moveList, moveTask, setDraggedItem } from '@/state/actions'
import { useAppState } from '@/state/app-state-context'
import { ColumnContainer, ColumnTitle } from '@/styles/styled-components'
import { isHidden } from '@/utils/is-hidden-util'

type ColumnProps = {
  id: string
  text: string
  isPreview?: boolean
}

export const Column = ({ id, text, isPreview }: ColumnProps) => {
  const ref = useRef<HTMLInputElement>(null)

  const { draggedItem, getTasksByListId, dispatch } = useAppState()
  const { drag } = useDragItem({ type: 'COLUMN', id, text })

  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover: throttle(() => {
      if (!draggedItem) return

      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) return

        dispatch(moveList(draggedItem.id, id))
      } else {
        if (draggedItem.columnId === id) return
        if (tasks.length) return

        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id))
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }))
      }
    }, 200),
  })

  drag(drop(ref))

  const tasks = getTasksByListId(id)

  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden('COLUMN', id, draggedItem, isPreview)}
      isPreview={isPreview}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card key={task.id} id={task.id} text={task.text} columnId={id} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add another card'
        onAdd={(text) => dispatch(addTask(id, text))}
        dark
      />
    </ColumnContainer>
  )
}
