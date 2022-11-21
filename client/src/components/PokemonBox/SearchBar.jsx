import { useState } from "react"
import { useDispatch } from "react-redux"
import { getDetailName } from "../../redux/actions"
import { useHistory } from "react-router-dom"

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
    dispatch(getDetailName(input))
    history.push(`/pokemon/${input}`) // eslint-disable-next-line
    setInput("")
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
    <input 
        name="searchBar"
        type="text"
        value={input} 
        onChange={handleInput}/>
        <button type="submit">Search</button>
    </form>
      
    </>
  )
}

export default SearchBar