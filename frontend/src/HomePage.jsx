import React, { useEffect, useState } from 'react'
import { API_BASEURL } from './constants'
import { Link } from 'react-router-dom'
import Appartment from './Appartment'
import {Button, TextField} from "@mui/material";
import style from './style/style.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
      <div>
        <Link className={'home_search--wishlist'} to="/wishlist"><FavoriteBorderIcon/></Link>
        <div className={'home_search'}>
          <TextField
              onChange={(e) => setAreaFrom(e.target.value)}
              label="Площадь от"
              variant="outlined"
              size="small"
              color="secondary"
              className={'home_search--input'}
          />
          <TextField
              onChange={(e) => setAreaTo(e.target.value)}
              label="Площадь до"
              variant="outlined"
              size="small"
              color="secondary"
              className={'home_search--input'}
          />
          <TextField
              onChange={(e) => setPriceFrom(e.target.value)}
              label="Цена от"
              variant="outlined"
              size="small"
              color="secondary"
              className={'home_search--input'}
          />
          <TextField
              onChange={(e) => setPriceTo(e.target.value)}
              label="Цена до"
              variant="outlined"
              size="small"
              color="secondary"
              className={'home_search--input'}
          />
        </div>
        <div className={'home_search--search-filed'}>
          <TextField
              className={'home_search--search-filed__input'}
              onChange={onSearchChange}
              label="Поисковый запрос"
              variant='standard'
              color="secondary"
          />
          <Button
              className={'home_search--search-filed__btn'}
              variant="contained"
              color="secondary"
              onClick={search}
          >Search
          </Button>
        </div>
        <div className={'home_search--offers'}>
          <h2 className={'home_search--offers__title'}>Самые выгодные предложения</h2>
            {appartments.map((appartment) => (
                  <Appartment
                      id={appartment.id}
                      number={appartment.number}
                      photos={appartment.photos}
                      address={appartment.address}
                      description={appartment.address}
                      area={appartment.area}
                      price={appartment.price}
                  />
            ))}
        </div>
      </div>
  )
}

export default HomePage
