import Pokemon from "./Pokemon";

// https://github.com/bradtraversy/simple_react_pagination
const PokemonPage = ({ posts, loading }) => {

  if (!loading) {
    return <h2>Loading...</h2>;
  } else if (!posts.length) {
    return <h2>No pokemons!</h2>
  }

  return (
    <>
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
    </>
  )
}

export default PokemonPage