import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {searchByName} from  "../actions/index"
import styles from './SearchBar.module.css'

// {setOrder,setCurrentPage}
const Searchbar = () => {             
  const dispatch = useDispatch()
  const [search , setSearch] = useState("")
  

  const handleInputChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
    dispatch(searchByName(search))
    console.log(search)
    
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("probando")
    dispatch(searchByName(search))
    setSearch("")
    // setCurrentPage(1)
    // setOrder(`Order ${e.target.value}`)
  }
  return (
    <div className={styles.containerPrincipal}>
      <input className={styles.input} type="search" value={search} placeholder='Insert breed' onChange={(e) => handleInputChange(e)}/>
      <button className={styles.inputB} type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
  
    </div>
  )
}

export default Searchbar