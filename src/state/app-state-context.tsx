import { Dispatch, createContext, useContext } from 'react'
import { useImmerReducer } from 'use-immer'
import { DragItem } from '../types'
import { Action } from './actions'
import { AppState, List, Task, appStateReducer } from './app-state-reducer'

const appData: AppState = {
  lists: [
    {
      id: '1',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '2',
      text: 'In Progress',
      tasks: [{ id: 'c1', text: 'Learn Typescript' }],
    },
    {
      id: '3',
      text: 'Done',
      tasks: [{ id: 'c2', text: 'Begin to use static typing' }],
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
