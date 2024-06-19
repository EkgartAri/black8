import React from 'react'
import { Link } from 'react-router-dom'
import style from './style/style.scss';

// Функция для форматирования цены
function formatPrice(price) {
    return price.toLocaleString('ru-RU');
}
const Appartment = (props) => {
  return (
      <div className='home_search--apartment'>
          <Link to={`/appartments/${props.id}`} className='home_search--apartment__link'>
              <h4 className='home_search--apartment__address'>{props.address}</h4>
          </Link>

          <div className='home_search--apartment__photos'>
              {props.photos.map((photo) => (
                  <div key={photo.file} className='home_search--apartment__photo'>
                      <img className='home_search--apartment__img' src={photo.file} alt='Фото квартиры' />
                      <div className='home_search--apartment__photo-description'>{photo.description}</div>
                  </div>
              ))}
          </div>

          <div className='home_search--apartment__details'>
              <div className='home_search--apartment__description'>Описание квартиры: {props.description}</div>
              <div className='home_search--apartment__address'>Адрес: {props.address}</div>
              <div className='home_search--apartment__area'>Площадь: {props.area} м²</div>
              <div className='home_search--apartment__number'>Количество допустимых мест: {props.number}</div>
          </div>

          <div className='home_search--apartment__price'>
              <strong>Цена: {formatPrice(props.price)} руб.</strong>
          </div>
      </div>
  );
}

export default Appartment
