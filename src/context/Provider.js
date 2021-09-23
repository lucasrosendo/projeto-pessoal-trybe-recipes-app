import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Importando o context para ser usado no Provider
import RecipeContext from './RecipeContext';

// Recebe como props o children
function Provider({ children }) {
  // Getter e setter que armazena informações dos RadioButtons e tem como state inicial "ingrediente"
  const [searchType, setSearchType] = useState('ingrediente');
  // Getter e setter que armazena a informação de texto de procura digitado do usuário
  const [searchInputValue, setSearchInputValue] = useState('');

  // Função assíncrona que recebe como parametro a informação do RadioButton(searchType) e o texto do usuário(searchInputValue)
  const searchBarRequestFood = async (type, inputValue) => {
    let response = '';
    if (type === 'ingrediente') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`);
    }
    if (type === 'nome') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
    }
    if (type === 'primeira letra') {
      if (inputValue.length !== 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`);
    }

    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  };

  // Função assíncrona que recebe como parametro a informação do RadioButton(searchType) e o texto do usuário(searchInputValue)
  const searchBarRequestDrink = async (type, inputValue) => {
    let response = '';
    if (type === 'ingrediente') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`);
    }
    if (type === 'nome') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
    }
    if (type === 'primeira letra') {
      if (inputValue.length !== 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`);
    }

    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  };

  // É a variável que recebe todas as states que vão ser disponibilizadas para todo os componentes do App, ou seja, o estado global
  const context = {
    searchType, // Informação dos Radio Buttons, conforme option checked
    setSearchType, // Informação dos Radio Buttons, conforme option checked
    searchInputValue, // Informação de campo de input de procura
    setSearchInputValue, // Informação de campo de input de procura
    searchBarRequestFood, // Função que está no Context e receberá as informações de busca da SearchBar conforme usuário definiu na tela
    searchBarRequestDrink, // Função que está no Context e receberá as informações de busca da SearchBar conforme usuário definiu na tela
  };

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
