import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { API_BASEURL } from './constants'
import Appartment from './Appartment'

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
          <Appartment
            id={appartment.id}
            number={appartment.number}
            photos={appartment.photos}
            address={appartment.address}
            description={appartment.address}
            area={appartment.area}
            price={appartment.price}
          />
          <button onClick={addToFavorites}>ДОбавить ва избраное</button>
        </>
      )}
    </>
  )
}

export default AppartmentPage
