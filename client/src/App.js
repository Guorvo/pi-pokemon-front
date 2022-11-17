import './styles/App.css';
import NavBar from './components/NavBar';
import About from './components/About';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import CreatePokemon from './components/CreatePokemon';
import Landing from './components/Landing';
import { Route, Switch } from 'react-router-dom'



function App() {
  return (
    <div className="App">

      <Route exact path="/" component={Landing} />

      <Route path="/pokemon">
        <NavBar />
      </Route>



      <Route
        exact
        path="/about"
        render={() => <About info="Esta es la info" />} />

      <Route
        exact
        path="/pokemon"
        render={() => <PokemonList />} />
      <Switch>
        <Route exact path="/pokemon/create" component={CreatePokemon} />
        <Route
          path="/pokemon/:id"
          component={PokemonDetail}
        />
      </Switch>

    </div>
  );
}

export default App;
