import React from 'react'

import { API_BASEURL } from './constants'
import {Link, useNavigate} from 'react-router-dom'
import style from './style/style.scss';

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
      <div>
        <Link className={'registration-form__link'} to="/">
          На главную
        </Link>
        <form className={'registration-form'} onSubmit={register}>
          <input className={'registration-form__input'} name="email" label="email" type="email"
                 placeholder={"Введите email"}/>
          <input className={'registration-form__input'} name="password" label="password"
                 placeholder={"Придумайте пароль"} type="password"/>
          <button className={'registration-form__input'} type="submit">Зарегистрироваться</button>
        </form>
        <div className={'registration-form--wrap'}>
          <h1 className={'registration-form--wrap__title'}>Уютное место для отдыха</h1>
        </div>
      </div>
  )
}

export default RegisterPage
