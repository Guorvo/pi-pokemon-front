import {Link} from "react-router-dom"
import styles from "../../styles/Pokemon.module.css"

const Pokemon = ({image,name,types,id})=>{
  return(
    <div>
    <Link to={`/pokemon/${id}`}>
      <img src={image} alt={`${name}`} />
      <h2 className={styles.name}>{name}</h2>
    </Link>
    {types.map(t => (<span key={id + t} className={styles.types}>{t}</span>))}
    </div>
  )
}

export default Pokemon