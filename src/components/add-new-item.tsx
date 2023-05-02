import { useState } from 'react'
import { AddItemButton } from '../styles'
import NewItemForm from './new-item-form'

type AddNewItemProps = {
  onAdd: (text: string) => void
  toggleButtonText: string
  dark?: boolean
}

function AddNewItem({ onAdd, toggleButtonText, dark }: AddNewItemProps) {
  const [showForm, setShowForm] = useState<boolean>(false)

  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text)
          setShowForm(false)
        }}
      />
    )
  }

  return (
    <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  )
}

export default AddNewItem
