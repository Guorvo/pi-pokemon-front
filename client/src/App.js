import './styles/App.css';
import NavBar from './components/PokemonBox/NavBar';
import PokemonBox from './components/PokemonBox/PokemonBox';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import Landing from './components/Landing/Landing';
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
        path="/pokemon"
        render={() => <PokemonBox />} />

      <Switch>
        <Route 
          exact 
          path="/pokemon/create" 
          component={CreatePokemon} />
        <Route
          exact
          path="/pokemon/:id"
          component={PokemonDetail}
        />
      </Switch>

    </div>
  );
}

export default App;
