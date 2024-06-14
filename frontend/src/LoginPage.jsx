import React from 'react'

import { API_BASEURL } from './constants'
import { Link, useNavigate } from 'react-router-dom'
import style from './style/style.scss';

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
    <form className={'registration-form'} onSubmit={login}>
      <input className={'registration-form__input'} name="email" label="email" type="email" />
      <input className={'registration-form__input'}  name="password" label="password" type="password" />
      <button className={'registration-form__input'}  type="submit">Войти</button>
      <h2>
        <Link className={'registration-form__link'} to="/register">
          Еще не зарегестрированы?
        </Link>
      </h2>
    </form>
  )
}

export default LoginPage
