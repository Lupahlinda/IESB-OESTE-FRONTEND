import { useRef } from 'react'
import type { TaskModel } from '../../models/TaskModel'

import { PlayCircleIcon, StopCircleIcon } from 'lucide-react'

import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions'

import { getNextCycle } from '../../utils/getNextCycle'
import { getNextCycleType } from '../../utils/getNextCycleType'

import { showMessage } from '../../adapters/showMessage'
import { createTask, interruptTask } from '../../services/api'

import { Cycles } from '../Cycles'
import { Tips } from '../Tips'
import { DefaultButton } from '../DefaultButton'
import { DefaultInput } from '../DefaultInput'

export function MainForm() {
  const { state, dispatch } = useTaskContext()

  const taskNameInput = useRef<HTMLInputElement>(null)

  const lastTaskName =
    state.tasks[state.tasks.length - 1]?.name || ''

  const nextCycle = getNextCycle(state.currentCycle)
  const nextCycleType = getNextCycleType(nextCycle)

  async function handleCreateNewTask(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    showMessage.dismiss()

    if (taskNameInput.current === null) return

    const taskName = taskNameInput.current.value.trim()

    if (!taskName) {
      showMessage.warn('Digite o nome da tarefa')
      return
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    }

    dispatch({
      type: TaskActionTypes.START_TASK,
      payload: newTask,
    })

    showMessage.success('Tarefa iniciada')

    try {
      await createTask(newTask)
    } catch {
      showMessage.error('A tarefa iniciou, mas não foi persistida na API')
    }

    taskNameInput.current.value = ''
  }

  async function handleInterruptTask() {
    showMessage.dismiss()

    if (!state.activeTask) return

    showMessage.error('Tarefa interrompida!')

    const taskId = state.activeTask.id
    const interruptDate = Date.now()

    dispatch({
      type: TaskActionTypes.INTERRUPT_TASK,
    })

    try {
      await interruptTask(taskId, interruptDate)
    } catch {
      showMessage.error(
        'A tarefa foi interrompida localmente, mas a API falhou',
      )
    }
  }

  return (
    <form
      onSubmit={handleCreateNewTask}
      className="form"
      action=""
    >
      <div className="formRow">
        <DefaultInput
          ref={taskNameInput}
          labelText="task"
          id="meuInput"
          type="text"
          placeholder="Digite algo"
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>

      <div className="formRow">
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}

      <div className="formRow">
        {!state.activeTask && (
          <DefaultButton
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
            type="submit"
            icon={<PlayCircleIcon />}
          />
        )}

        {!!state.activeTask && (
          <DefaultButton
            aria-label="Interromper tarefa atual"
            title="Interromper tarefa atual"
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            key="botao_button"
          />
        )}
      </div>
    </form>
  )
}