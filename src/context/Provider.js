import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Importando o context para ser usado no Provider
import RecipeContext from './RecipeContext';

// Recebe como props o children
function Provider({ children }) {
  // Getter e setter que armazena informações de array do Meals ou Drinks, vinda do Search de Fetch API
  const [mealsOrDrinks, setmealsOrDrinks] = useState([]);
  // Getter e setter, do requisito 16, para permitir ou recusar redirecionamento conforme quantidade de itens na procura da SearchBar
  const [shouldRedirect, setShouldRedirect] = useState(false);
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
    // Recebe o array de retorno do fetch API que foi executado acima ou retorna um alert de erro que não foi encontrado itens nos filtros
    if (responseJson.meals !== null) {
      setmealsOrDrinks(responseJson.meals);
    } else {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    return responseJson;
  };

  // Comportamento de ComponentDidUpdate, e toda vez que o mealsOrDrinks for alterado, o ShouldRedirect será true.
  useEffect(() => {
    setShouldRedirect(true);
  }, [mealsOrDrinks]);

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
    // Recebe o array de retorno do fetch API que foi executado acima ou retorna um alert de erro que não foi encontrado itens nos filtros
    if (responseJson.drinks !== null) {
      setmealsOrDrinks(responseJson.drinks);
    } else {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
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
    mealsOrDrinks, // Função que recebe um array de Meals ou Drinks
    shouldRedirect, // Função que permite ou bloqueia o redirecionamento conforme array mealsOrDrinks. Sua alteração é pelo useEffect no Provider
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
