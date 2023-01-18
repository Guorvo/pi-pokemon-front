import { Link } from "react-router-dom"
import styles from "../../styles/Pokemon.module.css"
import color from "../../styles/Color.module.css"

const Pokemon = ({ image, name, types, id }) => {
  return (
    <div className={styles.minCard}>
      <Link className={styles.link} to={`/pokemon/${id}`}>
        <img src={image} alt={`${name}`} />
        <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      </Link>
      <div className={`${styles.types}`}>
        {types.map(t => (<div key={id + t} className={`${color["pkm-type"]} ${color[t]}`}><span>{t.charAt(0).toUpperCase() + t.slice(1)}</span></div>))}
      </div>
    </div>
  )
}

export default Pokemon