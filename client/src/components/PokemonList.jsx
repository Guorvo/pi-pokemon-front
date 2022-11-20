import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../redux/actions";
import PokemonPage from "./PokemonPage";
import Pagination from "./Pagination"

// https://github.com/bradtraversy/simple_react_pagination
const PokemonList = (props) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);


  useEffect(() => {
    dispatch(getPokemons()) 
    setLoading(true) // eslint-disable-next-line
  }, [])

  const pkmnPosts = useSelector((state) => state.pokemons)


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pkmnPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <h2>Soy el componente PokemonList</h2>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={pkmnPosts.length}
        paginate={paginate}
      />
      <PokemonPage posts={currentPosts} loading={loading} />
    </>
  )
}

export default PokemonList