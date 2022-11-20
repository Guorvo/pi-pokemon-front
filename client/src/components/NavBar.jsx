import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <>
      <ul>
        <li><Link to="/pokemon">PokemonList</Link></li>
        <li><Link to="/pokemon/create">Create a Pokemon</Link></li>
      </ul>
    </>
  )
}

export default NavBar