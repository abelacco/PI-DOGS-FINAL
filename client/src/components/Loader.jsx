import React from 'react'
import styles from "./Loader.module.css"
import gif from "../imagenes/giphy.gif"

export const Loader = () => {
  return (
    <div>
        <img className={styles.imagen} src={gif} />
    </div>
  )
}
