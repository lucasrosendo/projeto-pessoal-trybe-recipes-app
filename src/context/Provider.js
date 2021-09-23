import React from 'react';
import PropTypes from 'prop-types';
// Importando o context para ser usado no Provider
import RecipeContext from './RecipeContext';

// Recebe como props o children
function Provider({ children }) {
  // É a variável que recebe todas as states que vão ser disponibilizadas para todo os componentes do App, ou seja, o estado global
  const context = {};

  return (
    // Passa para todos os componentes o value que tem o context
    <RecipeContext.Provider value={ context }>
      { children }
    </RecipeContext.Provider>
  );
}

// Checagem do children se recebe um objeto
Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Provider;
