import React from 'react'
import { Link } from 'react-router-dom'

const Appartment = (props) => {
  return (
    <>
      <Link to={`/appartments/${props.id}`}>
        <h4>{props.number}</h4>
      </Link>

      {props.photos.map((photo) => (
        <>
          <img src={photo.file}></img>
          <div>{photo.description}</div>
        </>
      ))}

      <div>Адрес: {props.address}</div>
      <div>Описание: {props.description}</div>
      <i>Площадь: {props.area} м2</i>
      <br />
      <strong>Цена: {props.price} денях</strong>
    </>
  )
}

export default Appartment
