import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import User from '../../models/userClass'
import * as Yup from 'yup'

const Register = ({ agregar }) => {

  const history = useNavigate()

  function agregarUsuario(values) {
    const usuario = new User(
      values.name,
      values.email,
      values.password
    )
    agregar(usuario)
  }

  const valorInicial = {
    name: '',
    email: '',
    password: ''
  }

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .max(30, 'Nombre muy largo')
      .required('Nombre obligatorio'),
    email: Yup.string()
      .email()
      .required('Correo obligatorio'),
    password: Yup.string()
      .min(8, 'Contraseña muy corta')
      .required('Contraseña obligatoria'),
  })

  return (
    <div>
      <Formik
        initialValues={valorInicial}
        validationSchema={registerSchema}
        onSubmit={(values, actions) => {
          agregarUsuario(values)
          actions.resetForm({})
          actions.setSubmitting(false)
          history('/')
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
              <Field className='form-input' name='email' autoComplete="off" placeholder='Correo' />
              {errors.email && touched.email && (
                <ErrorMessage className='form-error' component='span' name='email' />
              )}
            </div>
            <div className='form-group'>
              <Field className='form-input' name='password' autoComplete="off" placeholder='Contraseña' />
              {errors.password && touched.password && (
                <ErrorMessage className='form-error' component='span' name='password' />
              )}
            </div>
            <button className='btn-submit' type='submit'>
              Registrar
            </button>
            <Link to='/login'> Ya tienes cuenta? Inicia Sesión</Link>
          </Form>)}
      </Formik>
    </div>
  )
}

Register.propTypes = {
  agregar: PropTypes.func.isRequired,
}

export default Register