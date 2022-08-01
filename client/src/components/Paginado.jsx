import React from 'react'
import styles from './Paginado.module.css'

export default function Paginado({dogPerPage, allDogs , paginado}) {
  const pageNumbers = []
  for (let i = 0; i < Math.ceil(allDogs/dogPerPage); i++) {           // haremos una division para calcular el # de páginas luego hacemos un for para pushear 1 x 1 al array
                                                                      // el array pageNumber luego se renderiza
    pageNumbers.push(i+1)
    
  }                                                                   // renderizamos los numeros con una funcion onClick para ejecutar la funcion que setea la página actual
  return (
    <nav className={styles.nav}>                                      
        <div className={styles.numbers}>
          {pageNumbers && pageNumbers.map( number =>
            {
              return(
            <div key={number} onClick={() => paginado(number)}>
              {number}         
            </div>
            )})
          }
        </div>
    </nav>
  )
}
