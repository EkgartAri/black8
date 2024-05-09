import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { API_BASEURL } from './constants'

const WishlistPage = () => {
  const navigate = useNavigate()
  const [appartments, setAppartments] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      return navigate('/login')
    }

    fetchWishlist().then()
  }, [])

  const fetchWishlist = async () => {
    const response = await fetch(`${API_BASEURL}/api/appartments/wishlist`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    setAppartments(await response.json())
  }

  return (
    <div>
      <Link to="/">Главная страница</Link>
      <h2>Избранное</h2>

      <ul>
        {appartments.map((appartment) => (
          <li>
            <Link to={`/appartments/${appartment.id}`}>
              <h4>{appartment.number}</h4>
            </Link>

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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WishlistPage
