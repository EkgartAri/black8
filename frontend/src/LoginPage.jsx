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
    <div>
      <Link className={'registration-form__link'} to="/">
        На главную
      </Link>
      <form className={'registration-form'} onSubmit={login}>
        <input className={'registration-form__input'} name="email" label="email" type="email" placeholder={"Введите email"} />
        <input className={'registration-form__input'}  name="password" label="password" placeholder={"Введите пароль"} type="password" />
        <button className={'registration-form__input'}  type="submit">Войти</button>
        <h2>
          <Link className={'registration-form__link'} to="/register">
            Еще не зарегистрированы?
          </Link>
        </h2>
      </form>
      <div className={'registration-form--wrap'}>
        <h1 className={'registration-form--wrap__title'}>Уютное место для отдыха</h1>
      </div>
    </div>
  )
}

export default LoginPage
