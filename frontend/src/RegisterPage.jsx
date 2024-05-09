import React from 'react'

import { API_BASEURL } from './constants'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate()

  const register = async (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    const email = data.get('email')
    const password = data.get('password')

    await fetch(`${API_BASEURL}/register/`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    navigate('/login')
  }

  return (
    <form onSubmit={register}>
      <input name="email" label="email" type="email" />
      <input name="password" label="password" type="password" />
      <button type="submit">Register</button>
    </form>
  )
}

export default RegisterPage
