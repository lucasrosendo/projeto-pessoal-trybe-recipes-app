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
  Details,
  FavoriteRecipes,
  FoodExplore,
  FoodExploreIngredients,
  FoodExploreLocal,
  DetailsInProgress,
  NotFound,
} from './pages';

function App() {
  return (
    // O Switch permite, conforme conponente, redirecionar as rotas
    <Switch>
      {/* Iniciando as rotas dos componentes */}
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/:id" component={ Details } />
      <Route exact path="/bebidas/:id" component={ Details } />
      <Route path="/comidas/:id/in-progress" component={ DetailsInProgress } />
      <Route path="/bebidas/:id/in-progress" component={ DetailsInProgress } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ FoodExplore } />
      <Route exact path="/explorar/bebidas" component={ DrinkExplore } />
      <Route path="/explorar/comidas/ingredientes" component={ FoodExploreIngredients } />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ DrinkExploreIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ FoodExploreLocal } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;

// Requisitos 01 => test_coverage_spec.js
// Requisitos 02-08 => login_spec.js
// Requisitos 09-12 => header_spec.js
// Requisitos 13-18 => header_search_bar_spec.js
// Requisitos 19-24 => footer_spec.js
// Requisitos 25-32 => recipes_list_spec.js
// Requisitos 33-46 => recipe_detail_spec.js
// Requisitos 47-53 => recipe_in_progress_spec.js

// Requisitos 82-87 =>profile_spec.js
