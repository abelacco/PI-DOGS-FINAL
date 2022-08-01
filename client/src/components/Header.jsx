import React from 'react'
import styles from './Header.module.css'
import iconHome from "../imagenes/riendo.png"
import iconCreate from "../imagenes/agregar.png"
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className={styles.headerContainer}> 
        <Link  to="/"><img width="40px" height="40px" src={iconHome}/></Link>
        <Link to="/home" className={styles.link}><h2>Guau Guau app</h2></Link> 
        <div className={styles.create}>
        <h4> Create Dog</h4>
        <Link to="/dog" className={styles.link}><img width="30px" height="30px" src={iconCreate}/></Link>
        </div>
      </div>
  )
}
