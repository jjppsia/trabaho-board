import throttle from 'lodash.throttle'
import { useRef } from 'react'
import { useDrop } from 'react-dnd'

import { useDragItem } from '@/hooks/use-drag-item'
import { moveTask, setDraggedItem } from '@/state/actions'
import { useAppState } from '@/state/app-state-context'
import { CardContainer } from '@/styles/styled-components'
import { isHidden } from '@/utils/is-hidden-util'

type CardProps = {
  id: string
  text: string
  columnId: string
  isPreview?: boolean
}

function Card({ id, text, columnId, isPreview }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { draggedItem, dispatch } = useAppState()
  const { drag } = useDragItem({ type: 'CARD', id, text, columnId })

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: throttle(() => {
      if (!draggedItem) return
      if (draggedItem.type !== 'CARD') return
      if (draggedItem.id === id) return

      dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId))
      dispatch(setDraggedItem({ ...draggedItem, columnId }))
    }, 200),
  })

  drag(drop(ref))

  return (
    <CardContainer
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden('CARD', id, draggedItem, isPreview)}
    >
      {text}
    </CardContainer>
  )
}

export default Card
