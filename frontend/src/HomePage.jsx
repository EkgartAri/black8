import React, { useEffect, useState } from 'react'
import { API_BASEURL } from './constants'
import { Link } from 'react-router-dom'
import Appartment from './Appartment'

const debounce = (callback, wait) => {
  let timeoutId = null
  return (...args) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback(...args)
    }, wait)
  }
}

const HomePage = () => {
  const [q, setQ] = useState('')
  const [areaFrom, setAreaFrom] = useState(0)
  const [areaTo, setAreaTo] = useState()
  const [priceFrom, setPriceFrom] = useState(0)
  const [priceTo, setPriceTo] = useState()
  const [appartments, setAppartments] = useState([])

  useEffect(() => {
    search().then()
  }, [])

  const onSearchChange = (e) => {
    setQ(e.target.value)

    debounce(search, 500)()
  }

  const search = async () => {
    let query = `${API_BASEURL}/api/appartments/search?q=${q}`

    if (areaFrom > 0) {
      query += `&area_from=${areaFrom}`
    }
    if (areaTo > 0) {
      query += `&area_to=${areaTo}`
    }
    if (priceFrom > 0) {
      query += `&price_from=${priceFrom}`
    }
    if (priceTo > 0) {
      query += `&price_to=${priceTo}`
    }

    const response = await fetch(query)
    setAppartments(await response.json())
  }

  return (
    <>
      <Link to="/wishlist">Избранное</Link>
      <div>
        <input onChange={onSearchChange} placeholder="Поисковый запрос" />
        <input
          onChange={(e) => setAreaFrom(e.target.value)}
          placeholder="Площадь от"
        />
        <input
          onChange={(e) => setAreaTo(e.target.value)}
          placeholder="Площадь до"
        />
        <input
          onChange={(e) => setPriceFrom(e.target.value)}
          placeholder="Цена от"
        />
        <input
          onChange={(e) => setPriceTo(e.target.value)}
          placeholder="Цена до"
        />
        <button onClick={search}>Search</button>
      </div>

      <div>
        <h2>Квартиры</h2>

        <ul>
          {appartments.map((appartment) => (
            <li>
              <Appartment
                id={appartment.id}
                number={appartment.number}
                photos={appartment.photos}
                address={appartment.address}
                description={appartment.address}
                area={appartment.area}
                price={appartment.price}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default HomePage
