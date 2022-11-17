import React from "react";
import {connect} from "react-redux"
import { getPokemons } from "../redux/actions";
import Pokemon from "./Pokemon";

class PokemonList extends React.Component{
  // constructor(props){
  //   super(props)
  // }

  componentDidMount(){
    this.props.getPokemons()
  }
  

  render(){
    return(
      <>
        <h2>Soy el componente PokemonList</h2>
        {
          this.props.pokemons.map(
            (pkmn) => <Pokemon 
            image={pkmn.image} 
            name={pkmn.name} 
            types={pkmn.types}
            key={pkmn.id} 
            id={pkmn.id}/>
          )
        }
      </>
    )
  }
}

const mapStateToProps = function(state){
  return{
    pokemons: state.pokemons
  }
}
const mapDispatchToProps = function(dispatch){
  return{
    getPokemons:() => dispatch(getPokemons())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList)