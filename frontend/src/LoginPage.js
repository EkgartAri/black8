import React from 'react'

import { API_BASEURL } from './constants'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    const email = data.get('email')
    const password = data.get('password')

    const response = await fetch(`${API_BASEURL}/login/`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const tokenData = await response.json()
    const token = tokenData.token

    localStorage.setItem('token', token)
    navigate('/')
  }

  return (
    <form onSubmit={login}>
      <input name="email" label="email" type="email" />
      <input name="password" label="password" type="password" />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginPage
