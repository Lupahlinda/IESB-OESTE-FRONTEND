import type { TaskModel } from '../../models/TaskModel'
import type { TaskStateModel } from '../../models/TaskStateModel'

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_STATE: 'RESET_STATE',
  CLEAR_TASKS: 'CLEAR_TASKS',
  HYDRATE_TASKS: 'HYDRATE_TASKS',
  COUNT_DOWN: 'COUNT_DOWN',
  COMPLETE_TASK: 'COMPLETE_TASK',
  CHANGE_SETTINGS: 'CHANGE_SETTINGS',
} as const

export type TaskActionsWithPayload =
  | {
      type: typeof TaskActionTypes.START_TASK
      payload: TaskModel
    }
  | {
      type: typeof TaskActionTypes.COUNT_DOWN
      payload: {
        secondsRemaining: number
      }
    }
  | {
      type: typeof TaskActionTypes.CHANGE_SETTINGS
      payload: TaskStateModel['config']
    }
  | {
      type: typeof TaskActionTypes.HYDRATE_TASKS
      payload: TaskModel[]
    }

export type TaskActionsWithoutPayload =
  | {
      type: typeof TaskActionTypes.RESET_STATE
    }
  | {
      type: typeof TaskActionTypes.CLEAR_TASKS
    }
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK
    }
  | {
      type: typeof TaskActionTypes.COMPLETE_TASK
    }

export type TaskActionModel =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload