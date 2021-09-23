import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch, Route } from 'react-router-dom';

// Importação das Páginas
import Login from './pages/Login';

function App() {
  return (
    // O Switch permite, conforme conponente, redirecionar as rotas
    <Switch>
      {/* Iniciando as rotas dos componentes */}
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;
