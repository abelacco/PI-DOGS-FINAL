import React from 'react'
import { Link } from 'react-router-dom'
import styles from "../components/LandingPage.module.css"
import homeIcon from "../imagenes/pata.png"

export default function LadingPage() {
  return (
    <div className={styles.LandingPage}>
      <h1> Welcome to Guau Guau Landing Page</h1>
      <Link to="/home">
        <img src={homeIcon} alt="loading" width="100px" height="100px" />
      </Link>
    </div>
  )
}
