import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import TaskList from './components/TaskList'
import Login from './components/Form/Login'
import Register from './components/Form/Register'
import User from './models/userClass'

const App = () => {

  const usuario1 = new User(
    'Jeferson', 'jeferson@gmail.com', '123456789'
  )

  const [users, setUser] = useState([usuario1])
  const [logged, setLogged] = useState(false)

  function cambiarEstado(estado) {
    setLogged(estado)
  }

  function agregarUsuario(user) {
    const tempUsers = [...users]
    tempUsers.push(user)
    setUser(tempUsers)
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          logged
            ? <TaskList
              estado={logged}
              cambiar={cambiarEstado}
            />
            : <Navigate to='/login' />
        } />
        <Route path='/login' element={
          logged
            ? <Navigate to='/' />
            : <Login usuarios={users}
              estado={logged}
              cambiar={cambiarEstado}
            />
        } />
        <Route path='/register' element={
          logged
            ? <Navigate to='/' />
            : <Register
              agregar={agregarUsuario}
            />
        } />
      </Routes>
    </Router>
  )
}

export default App