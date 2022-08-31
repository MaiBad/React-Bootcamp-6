import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { LEVELS } from '../models/levelsEnum'
import TaskClass from '../models/taskClass'
import TaskComponent from './Task'
import TaskForm from './TaskForm'
import '../styles/TaskList.css'

const TaskList = ({ estado, cambiar }) => {

  const defaultTask1 = new TaskClass(
    'Estudiar', 'JavaScript', true, LEVELS.URGENT
  )
  const defaultTask2 = new TaskClass(
    'Jugar LoL', 'Aramcitos :)', false, LEVELS.BLOCKING
  )
  const defaultTask3 = new TaskClass(
    'Cenar', '20:00', false, LEVELS.NORMAL
  )

  const [Tasks, setTasks] = useState(
    [defaultTask1, defaultTask2, defaultTask3]
  )
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, Math.random() * 4000)
  }, [Tasks])

  function completarTarea(task) {
    const index = Tasks.indexOf(task)
    const tempTasks = [...Tasks]
    tempTasks[index].completed = !tempTasks[index].completed
    setTasks(tempTasks)
  }

  function borrarTarea(task) {
    const index = Tasks.indexOf(task)
    const tempTasks = [...Tasks]
    tempTasks.splice(index, 1)
    setTasks(tempTasks)
  }

  function agregarTarea(task) {
    const tempTasks = [...Tasks]
    tempTasks.push(task)
    setTasks(tempTasks)
  }

  const CerrarSesion = () => {
    return (
      <button onClick={() => cambiar(!estado)}>
        Cerrar sesión
      </button>
    )
  }

  const Table = () => {
    return (
      <div>
        <CerrarSesion />
        <table className='table'>
          <thead className='table-head'>
            <tr className='table-header'>
              <th className='headers'>Nombre</th>
              <th className='headers'>Descripción</th>
              <th className='headers'>Prioridad</th>
              <th className='headers'>Acción</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {Tasks.map((task, index) => {
              return (
                <TaskComponent
                  key={index}
                  task={task}
                  completar={completarTarea}
                  remover={borrarTarea}>
                </TaskComponent>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  let tasksTable

  if (Tasks.length > 0) {
    tasksTable = <Table></Table>
  } else {
    tasksTable = (
      <div className='empty'>
        <CerrarSesion />
        <h3 className='notasks'>No hay tareas pendientes</h3>
        <h4 className='notasks'>Por favor, agrega una</h4>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='container-table'>
        <h2 className='table-title'>Tus tareas:</h2>
        <div data-mdb-perfect-scrollbar='true'>
          {Loading
            ? (<span className="loader"></span>)
            : tasksTable}
        </div>
      </div>
      <div className='container-form'>
        <TaskForm
          agregar={agregarTarea}
          length={Tasks.length}>
        </TaskForm>
      </div>
    </div>
  )
}

TaskList.propTypes = {
  estado: PropTypes.bool.isRequired,
  cambiar: PropTypes.func.isRequired
}

export default TaskList