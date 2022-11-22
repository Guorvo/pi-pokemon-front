import { Link } from "react-router-dom"
import styles from "../../styles/Pokemon.module.css"

const Pokemon = ({ image, name, types, id }) => {
  return (
    <div className={styles.minCard}>
      <Link className={styles.link} to={`/pokemon/${id}`}>
        <img src={image} alt={`${name}`} />
        <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      </Link>
      <div className={styles.types}>
        {types.map(t => (<span key={id + t} >{t.charAt(0).toUpperCase() + t.slice(1)}</span>))}
      </div>
    </div>
  )
}

export default Pokemon