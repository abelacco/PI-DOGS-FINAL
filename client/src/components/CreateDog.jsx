import React , {useEffect,useState} from 'react'
import {Link , useHistory} from "react-router-dom"
import {getTemps, createDog} from "../actions/index"
import { useDispatch,useSelector } from 'react-redux'
import Header from './Header'
import styles from "./CreateDog.module.css"

 // validar los inputs(estado local)
  
 const validate = (input) => {
  let errors= {}
  if (!input.name) {
    errors.name = "Breed required"
  }
  if (!input.weight_min) {
    errors.weight_min ="weight min required"
  }
  if (!input.weight_max) {
    errors.weight_max ="weight max required"
  } else if (input.weight_max < input.weight_min){
    errors.weight_max ="weight max has to be  mayor than weight min"
  }
  if (!input.height_min) {
    errors.height_min ="height min required"
  }
  if (!input.height_max) {
    errors.height_max ="height max required"
  } else if (input.height_max < input.height_min){
    errors.height_max ="height max has to be  mayor than height min"
  }
  if (input.image && !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(input.image)){
    errors.image ="is not URL"
  }
  // if (input.temperaments.length === 0) {
  //   errors.temperaments = "Insert at least 1 temperament"
  // }
  
  return errors;
}

export default function CreateDog() {
  const dispatch = useDispatch()
  const history = useHistory()
  const temperaments = useSelector((state) => state.temps)

  const [errors, setErrors] = useState({})
  const [input,setInput] = useState({
    name:"",
    weight_min:"",
    weight_max:"",
    height_min:"",
    height_max:"",
    life_span:"",
    image:"",
    temperaments: []

  })

  
  useEffect(() => {
    dispatch(getTemps())
  },[dispatch])
  
  // para setear las propiedades a input con la informacion de los formularios, se le pasa a todos los form
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value    //como son varios se captura la propiedad con name y se le pasa el valor del value del form, ahi envia esa invoracion al objeto input
    })

    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value    //como son varios se captura la propiedad con name y se le pasa el valor del value del form, ahi envia esa invoracion al objeto input
    }))
    console.log(input)
  }

  const handleSelect = (e) => {         //cada vez que presiono una option se agrega al temperamentos de input, tener en cuenta no pisar los anteriores realizar un spreed operator
    if( Object.values(input.temperaments).includes(e.target.value)) return alert("Temperament repeated")
    setInput({
      ...input,
      temperaments : [...input.temperaments, e.target.value]
    })
  }

  const handleDelete = (e) => {
    setInput({
      ...input,
      temperaments : input.temperaments.filter(t => t !== e.target.value)
    })
  }

  const handleSubmit = (e) => {         // parra enviar el formulario y crear el perro
    e.preventDefault()
    console.log(input)
    if(input.temperaments.length === 0) return alert("Select at least 1 one temperament")
    if(!input.name || !input.weight_min || !input.weight_max || !input.height_min || !input.height_max) return alert(" Breed , weight(min-max) and height(min-max are required ")
    dispatch(createDog(input))          // accion para crear el perro
    alert("Dog created!!")
    setInput({
      name:"",
      weight_min:"",
      weight_max:"",
      height_min:"",
      height_max:"",
      life_span:"",
      image:"",
      temperaments: []
    })
    history.push("/home")               // una vez creado el perro nos redirige al home
  }

  return (
    <div >
      <Header/>
      <div className={styles.prueba}>
      <div className={styles.AllForm}>
        <h1>Create your favorite Breed</h1>
        <form className={styles.Form} onSubmit={(e)=>{handleSubmit(e)}}>
          <div className={styles.info}>
          {/* // donde se recibe la info , label es la etiqueta e input el espacio donde se escribe la info */}
            <label>Breed</label>
            <input  type="text" value={input.name} name="name" onChange={handleChange} placeholder="Breed"/>  
            <p className={styles.spanE}>{errors.name && (<p className={styles.error}>{errors.name}</p>)}</p>
          </div>
          <div className={styles.info}>
            <label>Weight min</label>
            <input type="number" value={input.weight_min} name= "weight_min" onChange={handleChange} placeholder="weight min - kg"/>
            <p className={styles.spanE}>{errors.weight_min && (<p className={styles.error}>{errors.weight_min}</p>)}</p>
          </div>
          <div className={styles.info}>
            <label>Weight max</label>
            <input type="number" value={input.weight_max} name= "weight_max" onChange={handleChange} placeholder="weight max - kg"/>
            <p className={styles.spanE}>{errors.weight_max && (<p className={styles.error}>{errors.weight_max}</p>)}</p>
          </div>
          <div className={styles.info}>
            <label>Height min</label>
            <input type="number" value={input.height_min} name= "height_min" onChange={handleChange} placeholder="height min - cm"/>
            <p className={styles.spanE}>{errors.height_min && (<p className={styles.error}>{errors.height_min}</p>)}</p>
          </div>
          <div className={styles.info}>
            <label>Height max</label>
            <input type="number" value={input.height_max} name= "height_max" onChange={handleChange} placeholder="height max - cm"/>
            <p className={styles.spanE}>{errors.height_max && (<p className={styles.error}>{errors.height_max}</p>)}</p>
          </div>
          <div className={styles.info}>
            <label>Life span</label>
            <input type="number" value={input.life_span} name= "life_span" onChange={handleChange} placeholder="years"/>
          </div>
          <div className={styles.info}>
            <label>Image:</label>
            <input type="url" value={input.image} name= "image" onChange={handleChange} placeholder="URL image" />
            <p className={styles.spanE}>{errors.image && (<p className={styles.error}>{errors.image}</p>)}</p>
          </div>
          <div className={styles.info}>
            <label >Temperaments:</label>
            <select onChange={e => handleSelect(e)}>
              {
                  temperaments.map( t =>{ 
                    return(
                      <option value={t.name} key={t.id} >
                        {t.name}
                      </option>
                    )})
                }
            </select>
         </div>
          <div className={styles.temps}> 
            {
            input.temperaments.map(t => {
            return (<button className={styles.elements} value={t} key={t} type="button" onClick={(e) => handleDelete(e)}>
              {t}
              </button>)
            })
            }
            </div>
          <button  className={styles.buttonCreate} disabled={ Object.entries(errors).length === 0 ? false : true} type="submit" >Create Dog</button>
          {console.log(errors)}
        </form>
      </div>
      </div>
    </div>
  )
}
