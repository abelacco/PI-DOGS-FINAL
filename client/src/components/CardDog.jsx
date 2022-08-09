import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CardDog.module.css'

export default function CardDog({name, weight_min,weight_max, height_min,height_max, life_span ,image , temperaments , createdInDb,id}) {
  
  return (
    <div className={styles.CardDog}>
      <Link className={styles.link} to={"/dogs/" + id}>
      <div className={styles.allCaracteristicas}>
        <img src={image} alt="cargando" />
        <h3>{name}</h3>
        <div className={styles.caracteristicas}>
          <span>Weight: {weight_min} - {weight_max} kg</span>
          <span>Height: {height_min} - {height_max} cm</span>
          <span>Lifespan: {life_span} </span>
          </div>
          <div className={styles.temperaments}>
          {!!createdInDb
          ?temperaments.map((el, i)=>
          {
                    return i === temperaments.length-1
                    ?el.name
                    :el.name+' | '})
          :temperaments.map((el, i) => 
                    {return i === temperaments.length-1
                      ?el
                      :el+' | '})
          }
        </div>
      </div>
      </Link>
     
    </div>
  )
  
}
