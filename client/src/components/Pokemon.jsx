import {Link} from "react-router-dom"
 
const Pokemon = ({image,name,types,id})=>{
  return(
    <>
    <Link to={`/pokemon/${id}`}>
      <img src={image} alt={`${name}`} />
      <h3>{name}</h3>
    </Link>
    <p>{types}</p>
    <hr />
    </>
  )
}

export default Pokemon