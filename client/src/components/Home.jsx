import React from 'react'
import { useEffect, useState} from 'react';
import {useDispatch , useSelector} from "react-redux";
import {filterTemps, getDogs, getTemps , filterByOrigin, orderByAscDesc, orderByWeight} from "../actions/index"
import Paginado from './Paginado';
import CardDog from './CardDog';
import Searchbar from './Searchbar';
import Header from './Header';
import styles from './Home.module.css'
import Footer from "./Footer"
import { Loader } from './Loader';
import NotFound from './NotFound';
// import { axios } from 'axios';


export default function Home() {
  const dispatch = useDispatch()
  const allDogs = useSelector((state) => state.dogs)
  const allTemps = useSelector((state) => state.temps)
  const dogDetail = useSelector((state) => state.dogDetail)
  const [/*order*/, setOrder] = useState("")


  // Paginado 
  const [currentPage , setCurrentPage] = useState(1)  // pagina actual , empezamos por la 1, cambiará según vayan llamando
  const [dogPerPage , /*setdogPerPage*/] = useState(8) // número de dogs por página que queremos
  const indexOfLastDog = currentPage * dogPerPage // Calcular el indice de inicio ,
  const indexOfFirstDog = indexOfLastDog - dogPerPage // Calcular el indice de final , estos 2 indices servirán para hacer el corte por página y renderize los que estan entre los 2 índices 
  const currentDog = allDogs.slice(indexOfFirstDog,indexOfLastDog) // serían los perros que se van a renderizar según los índices

  const paginado = (pageNumber) => {          // esta función sirve para setear la página actual , recibirá como prop el número de pagina seleccionado
    setCurrentPage(pageNumber)                // es la que permitirá los cambios por página
  }
  

  useEffect(() => {
    if(dogDetail.length !== 0) {
      handleDelete()
    }
    dispatch(getDogs())
    dispatch(getTemps()) 
  
  },[dispatch])


  const handleDelete = (e) => {
    if(dogDetail)
    dogDetail.pop()
  }

  const handleClick = (e)=> {
    e.preventDefault()
    dispatch(getDogs())
    setCurrentPage(1)
  }

  const handleFilterByTemp = (e) => {
    e.preventDefault()
    dispatch(filterTemps(e.target.value))
    setCurrentPage(1)
  }

  const handleFilterByOrigin = (e) => {
    e.preventDefault()
    dispatch(filterByOrigin(e.target.value))
    setCurrentPage(1)
  }

  const handleFilterAscDesc = (e) => {
    e.preventDefault()
    dispatch(orderByAscDesc(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`) 
  }

  const handleOrderWeight = (e) => {
      e.preventDefault()
      dispatch(orderByWeight(e.target.value))
      setCurrentPage(1)
      setOrder(`Ordenado ${e.target.value}`) 
    }


  return (
    <div className={styles.homeContainer}>
      <Header />
      <div className={styles.searchcontainer}>
        <div className={styles.mainContainer}>
            <h2>Find Your Perfect Dog Breed</h2>
            <div className={styles.SyR}>
            <Searchbar setCurrentPage={setCurrentPage}/>
            <button className={styles.buttonR} onClick={e => {handleClick(e)}}>Refresh </button>
           </div>
           <div  className={styles.filterContainer}>
              <select onChange={ e => {handleFilterAscDesc(e)}}>
                <option hidden>ORDER BY NAME</option>
                <option value="asc">A-Z</option>
                <option value="des">Z-A</option>
              </select>
              <select onChange={ e => {handleOrderWeight(e)}}>
                <option hidden>ORDER BY WEIGHT</option>
                <option value="max">Weight Max</option>
                <option value="min">Weigh Min</option>
              </select>
              <select onChange={ e => {handleFilterByOrigin(e)}}>
                <option hidden>FILTER BY ORIGIN</option>
                <option value="All">All</option>
                <option value="Created">Created</option>
                <option value="Api">Api</option>
              </select>
            
              <select onChange={ e => {handleFilterByTemp(e)}}>
                <option hidden>FILTER BY TEMPERAMENTS</option>
                <option value="All" >All</option>
                  {
                    allTemps.map( t =>{ 
                      return(
                        <option value={t.name} key={t.id} >
                          {t.name}
                        </option>
                      )})
                    }
              </select>
            </div>
          </div>
      </div>
     
      
      <div  className={styles.dogsContainer}> 
        <Paginado 
          dogPerPage={dogPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
          currentPage={currentPage}
          />
        <div className={styles.cardDogs}>
          {
            currentDog.length > 0
           ? currentDog !== "1"
              ?currentDog.map( d =>{ 
                return(
                  <div key={d.id}>
                    <CardDog name={d.name} weight_min={d.weight_min} weight_max={d.weight_max} height_min={d.height_min} height_max={d.height_max} life_span={d.life_span} image={d.image} temperaments={d.temperaments} createdInDb={d.createdInDb} id={d.id}/>
                  </div>
                )})
              : <NotFound />
            : <Loader/>
          }
        </div>
      </div>
     
      <Footer/>
    </div>
  )
}

