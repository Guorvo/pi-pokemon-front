import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import styles from "../../styles/NavBar.module.css"

const NavBar = (props) => {
  return (
    <div>
      <ul className={styles.navbarList}>
        <li className={`${styles.item} ${styles.itemL}`}><Link to="/pokemon">Pokemon Box</Link></li>
        <li className={`${styles.item} ${styles.itemL}`}><Link to="/pokemon/create">Create a Pokemon</Link></li>
        <SearchBar/>
      </ul>
    </div>
  )
}

export default NavBar