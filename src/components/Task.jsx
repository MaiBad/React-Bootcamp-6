import React from 'react'
import PropTypes from 'prop-types'
import Task from '../models/taskClass'
import { LEVELS } from '../models/levelsEnum'
import '../styles/Task.css'

const TaskComponent = ({ task, completar, remover }) => {

  function taskLevelBagde() {
    switch (task.level) {
      case LEVELS.NORMAL:
        return (
          <span className='badge badge-normal'>{task.level}</span>
        )
      case LEVELS.URGENT:
        return (
          <span className='badge badge-urgent'>{task.level}</span>
        )
      case LEVELS.BLOCKING:
        return (
          <span className='badge badge-blocking'>{task.level}</span>
        )
      default:
        break;
    }
  }
  function taskCompletedIcon() {
    if (task.completed) {
      return (
        <i className="fa-solid fa-toggle-on"
          onClick={() => completar(task)}
          style={{ color: '#adff2f' }}></i>
      )
    } else {
      return (
        <i className="fa-solid fa-toggle-off"
          onClick={() => completar(task)}
          style={{ color: '#969696' }}></i>
      )
    }
  }

  return (
    <tr className={task.completed ? 'completed' : ''}>
      <td className='data'>{task.name}</td>
      <td className='data'>{task.description}</td>
      <td className='data'>{taskLevelBagde()}</td>
      <td className='data actions'>
        {taskCompletedIcon()}
        <i className="fa-solid fa-trash-can"
          onClick={() => remover(task)}
          style={{ color: '#f00' }}></i>
      </td>
    </tr>
  )
}

TaskComponent.propTypes = {
  task: PropTypes.instanceOf(Task).isRequired,
  completar: PropTypes.func.isRequired,
  remover: PropTypes.func.isRequired
}

export default TaskComponent