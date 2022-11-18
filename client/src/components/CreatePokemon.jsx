import { useState } from "react"

const CreatePokemon = () => {
  const [input, setInput] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    type: []
  })

  const changeHandler = (event) => {
    const property = event.target.name
    const value = event.target.value

    setInput({
      ...input,
      [property]: value
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <form onSubmit={submitHandler}>

        <div>
          <label htmlFor="name">NAME:</label>
          <input 
            type="text" 
            name="name" 
            value={input.name} 
            onChange={changeHandler} />
        </div>

        <div>
          <label htmlFor="hp">IMAGE:</label>
          <input 
            type="url" 
            name="image" 
            value={input.image} 
            onChange={changeHandler} />
        </div>

        <div>
          <label htmlFor="hp">HP:</label>
          <input 
            type="number" 
            name="hp" 
            value={input.hp}
            onChange={changeHandler} />
        </div>

        <div>
          <label htmlFor="attack">ATTACK:</label>
          <input 
            type="number" 
            name="attack" 
            value={input.attack} 
            onChange={changeHandler} />
        </div>

        <div>
          <label htmlFor="defense">DEFENSE:</label>
          <input 
            type="number" 
            name="defense" 
            value={input.defense} 
            onChange={changeHandler} />
        </div>

        <div>
          <label htmlFor="speed">SPEED:</label>
          <input 
            type="number" 
            name="speed" 
            value={input.speed} 
            onChange={changeHandler} />
        </div>

        <div>
          <label htmlFor="height">HEIGHT:</label>
          <input 
            type="number" 
            name="height" 
            value={input.height} 
            onChange={changeHandler} />
        </div>

        <div>
          <label htmlFor="weight">WEIGHT:</label>
          <input 
            type="number" 
            name="weight" 
            value={input.weight} 
            onChange={changeHandler} />
        </div>

        <>
          
        </>

        <button type="submit">SUBMIT</button>
      </form>
    </>
  )
}


export default CreatePokemon