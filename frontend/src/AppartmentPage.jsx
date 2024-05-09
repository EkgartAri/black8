import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { API_BASEURL } from './constants'

const AppartmentPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [appartment, setAppartment] = useState()
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchAppartment().then()
  }, [])

  const fetchAppartment = async () => {
    const response = await fetch(`${API_BASEURL}/api/appartments/${id}`)
    setAppartment(await response.json())
  }

  const addToFavorites = () => {
    if (!token) {
      return navigate('/login')
    }

    fetch(`${API_BASEURL}/api/appartments/wishlist/?pk=${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  }

  return (
    <>
      <Link to="/">Главная страница</Link>
      {appartment && (
        <>
          <h4>{appartment.number}</h4>

          {appartment.photos.map((photo) => (
            <>
              <img src={photo.file}></img>
              <div>{photo.description}</div>
            </>
          ))}

          <div>Описание: {appartment.description}</div>
          <i>Площадь: {appartment.area} м2</i>
          <br />
          <strong>Цена: {appartment.price} денях</strong>
          <button onClick={addToFavorites}>ДОбавить ва избраное</button>
        </>
      )}
    </>
  )
}

export default AppartmentPage
