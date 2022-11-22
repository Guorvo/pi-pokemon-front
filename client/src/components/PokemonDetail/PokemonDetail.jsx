import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../redux/actions";
import styles from "../../styles/PokemonDetail.module.css"

const PokemonDetail = (props) => {
  const { id } = props.match.params
  const dispatch = useDispatch()

  const pokemonDetail = useSelector((state) => state.pokemonDetail)

  useEffect(() => {
    dispatch(getPokemonDetail(id)) // eslint-disable-next-line
  }, [])

  return (
    pokemonDetail.name ?
      <div className={styles.card}>
        <img src={pokemonDetail.image} alt={pokemonDetail.name} />
        <div>
          <h2>{pokemonDetail.name.charAt(0).toUpperCase() + pokemonDetail.name.slice(1)}</h2>
          <h5>#{pokemonDetail.id}</h5>
        </div>
        <div className={styles.types}>
          {pokemonDetail.types !== undefined
            ? pokemonDetail.types.map(type => <span key={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>)
            : <p>Loading Types!</p>}
        </div>

        <div className={styles.container}>
          <p>Hp</p> <p>{pokemonDetail.hp}</p>
          <p>Attack</p> <p>{pokemonDetail.attack}</p>
          <p>Defense</p> <p>{pokemonDetail.defense}</p>
          <p>Speed</p> <p>{pokemonDetail.speed}</p>
          <p>Height</p> <p>{pokemonDetail.height}</p>
          <p>Weight</p> <p>{pokemonDetail.weight}</p>
        </div>
      </div> : null
  )
}

export default PokemonDetail