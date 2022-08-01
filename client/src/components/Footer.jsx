import React from 'react'
import styles from './Footer.module.css'
import iconLove1 from "../imagenes/dog.png"
import iconLove2 from "../imagenes/pet.png"
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className={styles.FooterContainer}> 
        <Link  to="/"><img width="40px" height="40px" src={iconLove1}/></Link>
        <Link to="/home" className={styles.link}><h2>Created by abelacco</h2></Link> 
        <Link  to="/"><img width="40px" height="40px" src={iconLove2}/></Link>    
    </div>
  )
}
