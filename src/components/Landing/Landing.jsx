import React from "react";
import { Link } from "react-router-dom";
import style from "../../styles/Landing.module.css"

const Landing = () => {
  return (
    <div className={style.landing}>
      <h2 className={style.landingHeader}>Welcome to my PokeAPI project!</h2>
      <Link to="/pokemon"><button className={style.landingButton}>Gotta render 'em all!</button></Link>
    </div>
  )
}

export default Landing