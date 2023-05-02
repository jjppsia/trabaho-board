import AddNewItem from './components/add-new-item'
import { Column } from './components/column'
import CustomDragLayer from './components/custom-drag-layer'
import { addList } from './state/actions'
import { useAppState } from './state/app-state-context'
import { AppContainer } from './styles'

function App() {
  const { lists, dispatch } = useAppState()

  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map(({ id, text }) => (
        <Column key={id} id={id} text={text} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add another list'
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  )
}

export default App
