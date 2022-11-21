import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
const NavBar = (props) => {
  return (
    <>
      <ul>
        <li><Link to="/pokemon">PokemonList</Link></li>
        <li><Link to="/pokemon/create">Create a Pokemon</Link></li>
      </ul>
      <SearchBar/>
    </>
  )
}

export default NavBar