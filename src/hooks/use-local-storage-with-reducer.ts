import { AppState, appStateReducer } from '@/state/app-state-reducer'
import { useEffect } from 'react'
import { useImmerReducer } from 'use-immer'

const LOCAL_STORAGE_KEY = 'app-state'

export const useLocalStorageWithReducer = (initialAppState: AppState) => {
  const [appState, dispatch] = useImmerReducer(
    appStateReducer,
    initialAppState,
    () => {
      const localAppState = localStorage.getItem(LOCAL_STORAGE_KEY)
      return localAppState
        ? (JSON.parse(localAppState) as AppState)
        : initialAppState
    }
  )

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appState))
  }, [appState])

  return [appState, dispatch] as const
}
