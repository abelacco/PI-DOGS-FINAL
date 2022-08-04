import React , {useEffect } from 'react'
import {Link , useParams} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import { getDogByID } from '../actions/index'
import styles from './DogDetail.module.css'
import Header from './Header'
import Footer from './Footer'
import { Loader } from './Loader'
import homeIcon from "../imagenes/dog-house.png"

export default function Dogdetail(props) {
  // console.log(props)
  const dispatch = useDispatch()
  const dogDetail = useSelector((state) => state.dogDetail)
  const { id } = useParams();


  
  useEffect(() => {
    dispatch(getDogByID(id))
  },[dispatch,id])

  const handleDelete = (e) => {
    dogDetail.pop()
  }




     return (
    <div className={styles.all}>
      <Header />
      <div className={styles.principal}>
          {
            dogDetail.length > 0 
            ?<div className={styles.abox}>
                <img className={styles.imagen} alt="loading" src={dogDetail[0].image}  />
                <div className={styles.textcontainer}>
                    <h1> {dogDetail[0].name}</h1>
                    <div>
                        <h5>Weight: {dogDetail[0].weight_min} - {dogDetail[0].weight_max} kg</h5>
                        <h5>Height: {dogDetail[0].height_min} - {dogDetail[0].height_max} cm</h5>
                        <h5>Lifespan: {dogDetail[0].life_span} </h5>
                    </div>
                    <div>
                        {!!dogDetail[0].createdInDb
                        ?dogDetail[0].temperaments.map((el, i)  =>
                        {
                                  return i === dogDetail[0].temperaments.length-1
                                  ?el.name
                                  :el.name+' | '})
                        :dogDetail[0].temperaments.map((el, i) => 
                                  {return i === dogDetail[0].temperaments.length-1
                                    ?el
                                    :el+' | '})
                        }
                    </div>
                    <Link to="/home"><img className={styles.imagenHouse} onClick={handleDelete} src={homeIcon} alt="loading" width="60px" height="60px" /></Link>    
                  </div>
              </div>
            : <Loader />
          }
      </div>
      <Footer/>
    </div>
  )

  
}
