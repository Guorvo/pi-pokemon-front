import { useState } from "react"
import { useDispatch } from "react-redux"
import { getDetailName } from "../../redux/actions"
import { useHistory } from "react-router-dom"
import styles from "../../styles/SearchBar.module.css"

const SearchBar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [input, setInput] = useState("")

  const handleInput = (event) => {
    const value = event.target.value
    setInput(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(getDetailName(input.toLowerCase()))
    history.push(`/pokemon/${input.toLowerCase()}`) // eslint-disable-next-line
    setInput("")
  }

  return (
    <form 
      className={styles.BarPosition}
      onSubmit={handleSubmit}>
    <input 
        autoComplete="off"
        className={styles.inputBar}
        name="searchBar"
        type="text"
        value={input} 
        onChange={handleInput}/>
        <button className={styles.buttonBar} type="submit">Search</button>
    </form>
  )
}

export default SearchBar