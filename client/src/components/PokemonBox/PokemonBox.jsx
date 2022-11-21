import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions";
import PokemonPage from "./PokemonPage";
import Pagination from "./Pagination"



// https://github.com/bradtraversy/simple_react_pagination
const PokemonBox = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [filterOrder, setfilterOrder] = useState({
    filter: "default",
    filterType: "normal",
    sort: "id",
    sortFlow: "asc",
    processedPosts: []
  })
  
  const pkmnPosts = useSelector((state) => state.pokemons)
  const pkmnTypes = useSelector((state) => state.types)

  useEffect(() => {
    dispatch(getPokemons())
    dispatch(getTypes()) // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setfilterOrder({
      ...filterOrder,
      processedPosts: [...pkmnPosts],
    });
    setLoading(true) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pkmnPosts]);

  const filtering = (sort, sortFlow, filter, filterType) => {
    let posts = [...pkmnPosts]
      switch (filter) {
        case "types":
          posts = posts.filter(x => x.types.includes(filterType))
          break
        case "api":
          posts = posts.filter(x => !x.dbContent)
          break
        case "db":
          posts = posts.filter(x => x.dbContent)
          break
        default:
          break
      }

      switch (sort) {
        case "name":
          // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
          posts.sort((a, b) => a.name.localeCompare(b.name))
          break
        case "attack":
          posts.sort((a, b) => a.attack - b.attack)
          break
        default:
          break
      }

      switch (sortFlow) {
        case "des":
          posts = posts.reverse()
          break
        default:
          break
      }
    return posts
  }

  const sortHandler = (event) => {
    const value = event.target.value

    setfilterOrder({
      ...filterOrder,
      sort: value,
      processedPosts: filtering(value, filterOrder.sortFlow, filterOrder.filter, filterOrder.filterType)
    })
  }

  const sortflowHandler = (event) => {
    const value = event.target.value

    setfilterOrder({
      ...filterOrder,
      sortFlow: value,
      processedPosts: filtering(filterOrder.sort, value, filterOrder.filter, filterOrder.filterType)
    })
  }

  const filterHandler = (event) => {
    const value = event.target.value

    setfilterOrder({
      ...filterOrder,
      filter: value,
      processedPosts: filtering(filterOrder.sort, filterOrder.sortFlow, value, filterOrder.filterType)
    })
  }

  const typefilterHandler = (event) => {
    const value = event.target.value

    setfilterOrder({
      ...filterOrder,
      filterType: value,
      processedPosts: filtering(filterOrder.sort, filterOrder.sortFlow, filterOrder.filter, value)
    })
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filterOrder.processedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <select name="sort" onChange={sortHandler}>
        <option value="id">Sort by ID</option>
        <option value="name">Sort by Name</option>
        <option value="attack">Sort by Attack</option>
      </select>

      <select name="sortFlow" onChange={sortflowHandler}>
        <option value="asc">Asc.</option>
        <option value="des">Des.</option>
      </select>

      <select name="filter" onChange={filterHandler}>
        <option value="default">No Filter</option>
        <option value="types">Filter by Type</option>
        <option value="api">Filter API Pokemons</option>
        <option value="db">Filter DB Pokemons</option>
      </select>

      {filterOrder.filter === "types"
        ? <select name="filterType" onChange={typefilterHandler}>
          {pkmnTypes.map(t => {
            return (<option value={t.name} key={`type-${t.id}`} >{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</option>)
          })}
        </select>
        : null}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filterOrder.processedPosts.length}
        paginate={paginate}
      />

      <PokemonPage posts={currentPosts} loading={loading} />

    </>
  )
}

export default PokemonBox