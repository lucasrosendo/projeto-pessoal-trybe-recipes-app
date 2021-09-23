import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch, Route } from 'react-router-dom';

// Importação das Páginas
import {
  Login,
  Explore,
  Foods,
  Drinks,
  Profile,
  DoneRecipes,
  DrinkExplore,
  DrinkExploreIngredients,
  DrinkInProgress,
  DrinkDetails,
  FavoriteRecipes,
  FoodDetails,
  FoodExplore,
  FoodExploreIngredients,
  FoodExploreLocal,
  FoodInProgress,
} from './pages';

function App() {
  return (
    // O Switch permite, conforme conponente, redirecionar as rotas
    <Switch>
      {/* Iniciando as rotas dos componentes */}
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/:id-da-receita" component={ FoodDetails } />
      <Route exact path="/bebidas/:id-da-receita" component={ DrinkDetails } />
      <Route exact path="/comidas/:id-da-receita/in-progress" component={ FoodInProgress } />
      <Route exact path="/bebidas/:id-da-receita/in-progress" component={ DrinkInProgress } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ FoodExplore } />
      <Route exact path="/explorar/bebidas" component={ DrinkExplore } />
      <Route exact path="/explorar/comidas/ingredientes" component={ FoodExploreIngredients } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ DrinkExploreIngredients } />
      <Route exact path="/explorar/comidas/area" component={ FoodExploreLocal } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
