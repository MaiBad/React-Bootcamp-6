import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const Login = ({ usuarios, estado, cambiar }) => {

  const history = useNavigate()

  const valorInicial = {
    email: '',
    password: ''
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Correo obligatorio'),
    password: Yup.string()
      .required('Contraseña obligatoria'),
  })

  return (
    <Formik
      initialValues={valorInicial}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        usuarios.forEach((usuario) => {
          if (usuario['email'] === values['email']
            && usuario['password'] === values['password']) {
            cambiar(!estado)
            history('/')
          }
        })
      }}
    >
      {({ touched, errors }) => (
        <Form className='form'>
          <div className='form-group'>
            <Field className='form-input' name='email' autoComplete="off" placeholder='Correo' />
            {errors.email && touched.email && (
              <ErrorMessage className='form-error' component='span' name='email' />
            )}
          </div>
          <div className='form-group'>
            <Field className='form-input' type='password' name='password' autoComplete="off" placeholder='Contraseña' />
            {errors.password && touched.password && (
              <ErrorMessage className='form-error' component='span' name='password' />
            )}
          </div>
          <button className='btn-submit' type='submit'>
            Iniciar Sesión
          </button>
          <Link to='/register'> No tienes cuenta? Registrate</Link>
        </Form>)}
    </Formik>
  )
}

Login.propTypes = {
  usuarios: PropTypes.array.isRequired,
  estado: PropTypes.bool.isRequired,
  cambiar: PropTypes.func.isRequired
}

export default Login