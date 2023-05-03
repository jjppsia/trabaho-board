import { useState } from 'react'

import NewItemForm from '@/components/new-item-form'
import { AddItemButton } from '@/styles/styled-components'

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
