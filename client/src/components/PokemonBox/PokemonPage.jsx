import Pokemon from "./Pokemon";
import styles from "../../styles/PokemonPage.module.css"

// https://github.com/bradtraversy/simple_react_pagination
const PokemonPage = ({ posts, loading }) => {

  if (!loading) {
    return <h2>Loading...</h2>;
  } else if (!posts.length) {
    return <h2>No pokemons!</h2>
  }

  return (
    <div className={styles.boxpkmn}>
      {
        posts.map(
          (pkmn) => <Pokemon
            image={pkmn.image}
            name={pkmn.name}
            types={pkmn.types}
            key={pkmn.id}
            id={pkmn.id} />
        )
      }
    </div>
  )
}

export default PokemonPage