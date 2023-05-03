import { Dispatch, createContext, useContext } from 'react'
import { useImmerReducer } from 'use-immer'

import { DragItem } from '@/types'
import { Action } from '@/state/actions'
import {
  AppState,
  List,
  Task,
  appStateReducer,
} from '@/state/app-state-reducer'

const appData: AppState = {
  lists: [
    {
      id: '1',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Implement oauth authentication' }],
    },
    {
      id: '2',
      text: 'In Progress',
      tasks: [{ id: 'c1', text: 'Move columns and rows back and forth' }],
    },
    {
      id: '3',
      text: 'Done',
      tasks: [{ id: 'c2', text: 'Refactor imports. It must use aliases' }],
    },
  ],
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
  const [state, dispatch] = useImmerReducer(appStateReducer, appData)
  const { lists, draggedItem } = state

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
