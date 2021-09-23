import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch, Route } from 'react-router-dom';

// Importação das Páginas
import { Login, Explore, Foods, Drinks, Profile } from './pages';

function App() {
  return (
    // O Switch permite, conforme conponente, redirecionar as rotas
    <Switch>
      {/* Iniciando as rotas dos componentes */}
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/explorar" component={ Explore } />
    </Switch>
  );
}

export default App;
