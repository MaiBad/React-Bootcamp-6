import React from 'react'
import PropTypes from 'prop-types'
import { LEVELS } from '../models/levelsEnum';
import Task from '../models/taskClass';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../styles/TaskForm.css'

const TaskForm = ({ agregar, length }) => {

  function agregarTarea(values) {
    const tarea = new Task(
      values.name,
      values.description,
      false,
      values.level
    )
    agregar(tarea)
  }

  const valorInicial = {
    name: '',
    description: '',
    level: LEVELS.NORMAL
  }

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Nombre muy corto')
      .max(10, 'Nombre muy largo')
      .required('Nombre obligatorio'),
    description: Yup.string()
      .min(5, 'Descripción demasiado corta')
      .max(15, 'Descripción demasiado larga')
      .required('Descripción obligatoria'),
    level: Yup.string()
  }
  )

  return (
    <Formik
      initialValues={valorInicial}
      validationSchema={registerSchema}
      onSubmit={(values, actions) => {
        agregarTarea(values)
        actions.resetForm({})
        actions.setSubmitting(false)
      }}
    >
      {({ touched, errors }) => (
        <Form className='form'>
          <div className='form-group'>
            <Field className='form-input' name='name' autoComplete="off" placeholder='Nombre' />
            {errors.name && touched.name && (
              <ErrorMessage className='form-error' component='span' name='name' />
            )}
          </div>
          <div className='form-group'>
            <Field className='form-input' name='description' autoComplete="off" placeholder='Descripción' />
            {errors.description && touched.description && (
              <ErrorMessage className='form-error' component='span' name='description' />
            )}
          </div>
          <div className='form-group'>
            <Field className='form-input' as='select' name='level'>
              <option value={LEVELS.NORMAL}>Normal</option>
              <option value={LEVELS.URGENT}>Urgente</option>
              <option value={LEVELS.BLOCKING}>Bloqueando</option>
            </Field>
          </div>
          <button className='btn-submit' type='submit'>
            {length > 0
              ? 'Agregar nueva tarea'
              : 'Agregar primera tarea'}
          </button>
        </Form>)}
    </Formik>
  )
}

TaskForm.propTypes = {
  agregar: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired
}

export default TaskForm