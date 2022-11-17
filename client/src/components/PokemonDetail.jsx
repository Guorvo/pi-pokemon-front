import { useEffect } from "react";
import { connect } from "react-redux";
import { getPokemonDetail } from "../redux/actions";

const PokemonDetail = (props) => {
  const {id} = props.match.params
  useEffect(()=>{
    props.getPokemonDetail(id)
  },[])
  const {types} = props.pokemonDetail
  
  return(
    <>
      <h3>{props.pokemonDetail.name}</h3>
      <img src={props.pokemonDetail.image} alt={props.pokemonDetail.name} />
      {types !== undefined ? props.pokemonDetail.types.map(type => <p key={type}>{type}</p>) : <p>Loading Types!</p>}
      <p>HP {props.pokemonDetail.hp}</p>
      <p>ATTACK {props.pokemonDetail.attack}</p>
      <p>DEFENSE {props.pokemonDetail.defense}</p>
      <p>SPEED {props.pokemonDetail.speed}</p>
      <p>HEIGHT {props.pokemonDetail.height}</p>
      <p>WEIGHT {props.pokemonDetail.weight}</p>
    </>
  )
}

const mapStateToProps = function(state){
  return{
    pokemonDetail: state.pokemonDetail
  }
}
const mapDispatchToProps = function(dispatch){
  return{
    getPokemonDetail:(id) => dispatch(getPokemonDetail(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail)