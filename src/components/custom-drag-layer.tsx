import { useDragLayer } from 'react-dnd'
import { useAppState } from '../state/app-state-context'
import { CustomDragLayerContainer, DragPreviewWrapper } from '../styles'
import Card from './card'
import { Column } from './column'

function CustomDragLayer() {
  const { draggedItem } = useAppState()
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }))

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === 'COLUMN' ? (
          <Column id={draggedItem.id} text={draggedItem.text} isPreview />
        ) : (
          <Card
            id={draggedItem.id}
            text={draggedItem.text}
            columnId={draggedItem.columnId}
            isPreview
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null
}

export default CustomDragLayer
