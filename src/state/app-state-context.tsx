import { Dispatch, createContext, useContext } from 'react'

import { useLocalStorageWithReducer } from '@/hooks/use-local-storage-with-reducer'
import { Action } from '@/state/actions'
import { AppState, List, Task } from '@/state/app-state-reducer'
import { DragItem } from '@/types'

export const initialAppState: AppState = {
  lists: [],
  draggedItem: null,
}

type AppStateContextProps = {
  lists: List[]
  draggedItem: DragItem | null
  getTasksByListId(id: string): Task[]
  dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)

function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [appState, dispatch] = useLocalStorageWithReducer(initialAppState)
  const { lists, draggedItem } = appState

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || []
  }

  return (
    <AppStateContext.Provider
      value={{ lists, draggedItem, getTasksByListId, dispatch }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(AppStateContext)
}

export default AppStateProvider
