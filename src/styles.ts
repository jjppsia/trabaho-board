import styled from 'styled-components'

export const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  background-color: #3179ba;
  height: 100%;
  padding: 1.25rem;
  width: 100%;
`

type DragPreviewContainerProps = {
  isHidden?: boolean
  isPreview?: boolean
}

const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
  transform: ${(props) => (props.isPreview ? 'rotate(5deg)' : undefined)};
`
export const ColumnContainer = styled(DragPreviewContainer)`
  background-color: #ebecf0;
  width: 18.75rem;
  min-height: 2.5rem;
  margin-right: 1.25rem;
  border-radius: 0.1875rem;
  padding: 0.5rem 0.5rem;
  flex-grow: 0;
`
export const ColumnTitle = styled.div`
  padding: 0.375rem 1rem 0.75rem;
  font-weight: bold;
`
export const CardContainer = styled(DragPreviewContainer)`
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 18.75rem;
  border-radius: 0.1875rem;
  box-shadow: #091e4240 0px 1px 0px 0px;
`

type AddItemButtonProps = {
  dark?: boolean
}

export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 0.1875rem;
  border: none;
  color: ${(props) => (props.dark ? '#000' : '#fff')};
  cursor: pointer;
  max-width: 18.75rem;
  padding: 0.625rem 0.75rem;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:hover {
    background-color: #ffffff52;
  }
`
export const NewItemFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  max-width: 18.75rem;
`
export const NewItemButton = styled.button`
  background-color: #5aac44;
  border-radius: 0.1875rem;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 0.375rem 0.75rem;
  text-align: center;
`
export const NewItemInput = styled.input`
  border-radius: 0.1875rem;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`
export const CustomDragLayerContainer = styled.div`
  height: 100%;
  width: 100%;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`

type DragPreviewWrapperProps = {
  position: {
    x: number
    y: number
  }
}

export const DragPreviewWrapper = styled.div.attrs<DragPreviewWrapperProps>(
  ({ position }) => ({
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
    },
  })
)<DragPreviewWrapperProps>``
