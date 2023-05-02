import throttle from 'lodash.throttle'
import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { useItemDrag } from '../hooks/use-item-drag'
import { addTask, moveList } from '../state/actions'
import { useAppState } from '../state/app-state-context'
import { ColumnContainer, ColumnTitle } from '../styles'
import { isHidden } from '../utils/is-hidden-util'
import AddNewItem from './add-new-item'
import Card from './card'

type ColumnProps = {
  id: string
  text: string
  isPreview?: boolean
}

export const Column = ({ id, text, isPreview }: ColumnProps) => {
  const ref = useRef<HTMLInputElement>(null)

  const { draggedItem, getTasksByListId, dispatch } = useAppState()
  const { drag } = useItemDrag({ type: 'COLUMN', id, text })

  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover: throttle(() => {
      if (!draggedItem) return
      if (draggedItem.type !== 'COLUMN') return
      if (draggedItem.id === id) return

      dispatch(moveList(draggedItem.id, id))
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
