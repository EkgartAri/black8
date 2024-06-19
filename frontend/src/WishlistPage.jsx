import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { API_BASEURL } from './constants'
import Appartment from './Appartment'

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
            <Appartment
              id={appartment.id}
              number={appartment.number}
              photos={appartment.photos}
              address={appartment.address}
              description={appartment.description}
              area={appartment.area}
              price={appartment.price}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WishlistPage
