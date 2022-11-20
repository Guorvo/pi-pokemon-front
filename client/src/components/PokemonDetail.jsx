import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getPokemonDetail } from "../redux/actions";

const PokemonDetail = (props) => {
  const {id} = props.match.params
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPokemonDetail(id)) // eslint-disable-next-line
  },[])

  const pokemonDetail = useSelector((state) => state.pokemonDetail)


  return(
    <>
      <h3>{pokemonDetail.name}</h3>
      <p>ID {pokemonDetail.id}</p>
      <img src={pokemonDetail.image} alt={pokemonDetail.name} />
      {pokemonDetail.types !== undefined ? pokemonDetail.types.map(type => <p key={type}>{type}</p>) : <p>Loading Types!</p>}
      <p>HP {pokemonDetail.hp}</p>
      <p>ATTACK {pokemonDetail.attack}</p>
      <p>DEFENSE {pokemonDetail.defense}</p>
      <p>SPEED {pokemonDetail.speed}</p>
      <p>HEIGHT {pokemonDetail.height}</p>
      <p>WEIGHT {pokemonDetail.weight}</p>
    </>
  )
}

export default PokemonDetail