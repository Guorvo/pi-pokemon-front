import React from "react";
import { Link } from "react-router-dom";


const Landing = () => {
  return (
    <>
      <h2>Welcome to my PokeAPI project!</h2>
      <Link to="/pokemon"><button>Gotta render 'em all!</button></Link>
    </>
  )
}

export default Landing