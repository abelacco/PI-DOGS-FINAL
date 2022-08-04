import React from 'react'
import styles from './Paginado.module.css'

export default function Paginado({dogPerPage, allDogs , paginado, currentPage}) {
  const pageNumbers = []
  for (let i = 0; i < Math.ceil(allDogs/dogPerPage); i++) {           // haremos una division para calcular el # de páginas luego hacemos un for para pushear 1 x 1 al array
                                                                      // el array pageNumber luego se renderiza
    pageNumbers.push(i+1)
    
  }
  let lastPage = pageNumbers.length
  // renderizamos los numeros con una funcion onClick para ejecutar la funcion que setea la página actual
  return (
    <nav className={styles.nav}>                                      
        <div className={styles.numbers}>
          <button onClick={()=>paginado(currentPage === 1? currentPage : currentPage-1 )} className="active">🡸</button>
          {pageNumbers && pageNumbers.map( number =>
            {
              return(
            <div key={number} onClick={() => paginado(number) } className={ currentPage === number ?styles.active : styles.noActive}>
              {number}         
            </div>
            )})
          }
          <button onClick={()=>paginado(currentPage === lastPage? currentPage : currentPage+1  )} className="active">🡺</button>
        </div>
    </nav>
  )
}

{/* <button onClick={()=>paginado(currentPage === 1? currentPage : currentPage-1 )} className="active">🡸</button>
        {numeroDePagina?.map((e) => {
            return (
            <button onClick={() => paginado(e)} key={e} className={e === currentPage ? "active" : "otros"}>
              {e}
            </button>
          );
        })}
<button onClick={()=>paginado(currentPage === ultimaPagina? currentPage : currentPage+1  )} className="active">🡺</button> */}
