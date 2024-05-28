import React from 'react'
import { Link } from 'react-router-dom'
import style from './style/style.scss';

const Appartment = (props) => {
  return (
      <div className={'home_search--apartment'}>
          <Link to={`/appartments/${props.id}`}>
              <h4 className={'home_search--apartment__address'}>{props.address}</h4>
          </Link>

          {props.photos.map((photo) => (
              <>
                  <div>
                      <img className={'home_search--apartment__img'} src={photo.file}></img>
                  </div>
                  <div>{photo.description}</div>
              </>
          ))}
          <div>Описание: {props.description}</div>
          <i>Площадь: {props.area} м2</i>
          <div>Номер квартиры: {props.number}</div>
          <br/>
          <strong>Цена: {props.price} руб.</strong>
      </div>
  )
}

export default Appartment
