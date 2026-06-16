import { useEffect, useReducer, useRef } from 'react'

import { initialTaskState } from './initialTaskState'
import { taskReducer } from './taskReducer'
import { TaskContext } from './TaskContext'
import { TimerWorkerManager } from '../../workers/TimerWorkerManager'
import { TaskActionTypes } from './TaskActions'
import { loadBeep } from '../../utils/loadBeep'
import type { TaskStateModel } from '../../models/TaskStateModel'
import { completeTask, getSettings, getTasks } from '../../services/api'

type TaskContextProviderProps = {
  children: React.ReactNode
}

export function TaskContextProvider({
  children,
}: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialTaskState,
    () => {
      const storageState = localStorage.getItem('state')

      if (!storageState) {
        return initialTaskState
      }

      try {
        const parsedStorageState =
          JSON.parse(storageState) as TaskStateModel

        return {
          ...parsedStorageState,
          activeTask: null,
          secondsRemaining: 0,
          formattedSecondsRemaining: '00:00',
        }
      } catch {
        return initialTaskState
      }
    },
  )

  const playBeepRef = useRef<
    ReturnType<typeof loadBeep> | null
  >(null)
  const syncedCompletionIdsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
  }, [state])

  useEffect(() => {
    document.title = `${state.formattedSecondsRemaining} - Pomodoro`
  }, [state.formattedSecondsRemaining])

  useEffect(() => {
    if (!state.activeTask) {
      TimerWorkerManager.getInstance().terminate()
      playBeepRef.current = null
      return
    }

    const worker = TimerWorkerManager.getInstance()

    worker.onmessage(event => {
      const countDownSeconds = event.data

      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current()
          playBeepRef.current = null
        }

        dispatch({
          type: TaskActionTypes.COMPLETE_TASK,
        })

        worker.terminate()
        return
      }

      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: {
          secondsRemaining: countDownSeconds,
        },
      })
    })

    worker.postMessage(state)
  }, [state.activeTask])

  useEffect(() => {
    if (!state.activeTask) {
      playBeepRef.current = null
      return
    }

    if (playBeepRef.current === null) {
      const play = loadBeep()
      playBeepRef.current = play
      play()
    }
  }, [state.activeTask])

  useEffect(() => {
    async function hydrateFromApi() {
      try {
        const [apiSettings, apiTasks] = await Promise.all([
          getSettings(),
          getTasks(),
        ])

        dispatch({
          type: TaskActionTypes.CHANGE_SETTINGS,
          payload: {
            workTime: apiSettings.workTime,
            shortBreakTime: apiSettings.shortBreakTime,
            longBreakTime: apiSettings.longBreakTime,
          },
        })
        dispatch({ type: TaskActionTypes.HYDRATE_TASKS, payload: apiTasks })

        syncedCompletionIdsRef.current = new Set(
          apiTasks
            .filter((task) => task.completeDate !== null)
            .map((task) => task.id),
        )
      } catch {
        // Se a API estiver indisponível, mantém funcionamento local
      }
    }

    hydrateFromApi()
  }, [])

  useEffect(() => {
    const tasksToSync = state.tasks.filter(
      (task) =>
        task.completeDate !== null &&
        !syncedCompletionIdsRef.current.has(task.id),
    )

    tasksToSync.forEach((task) => {
      if (task.completeDate === null) return
      syncedCompletionIdsRef.current.add(task.id)
      completeTask(task.id, task.completeDate).catch(() => {
        syncedCompletionIdsRef.current.delete(task.id)
      })
    })
  }, [state.tasks])

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}