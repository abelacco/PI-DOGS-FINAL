import React from 'react'
import notFound from "../imagenes/notFound.gif"
import styles from "../components/NotFound.module.css"

export default function NotFound() {
    return (
    <div>
        <img className={styles.img} src={notFound} alt="loading"/>
    </div>
  )
}
