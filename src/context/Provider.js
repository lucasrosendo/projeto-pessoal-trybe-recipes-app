import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Importando o context para ser usado no Provider
import RecipeContext from './RecipeContext';

// Recebe como props o children
function Provider({ children }) {
  // Getter e setter de Categories para armazenar um array com as categorias recebidas da API - requisito 26
  const [foodCategory, setFoodCategory] = useState([]);
  // Getter e setter de Categories para armazenar um array com as categorias recebidas da API - requisito 26
  const [drinkCategory, setDrinkCategory] = useState([]);
  // Getter e setter que controla o "Loading" enquanto as comidas ou bebidas estão sendo renderizadas, utilizadas nas páginas Drink e Food
  const [isDrinkOrMealLoading, setIsDrinkOrMealLoading] = useState(false);
  // Getter e setter que armazena informações de array do Meals ou Drinks, vinda do Search de Fetch API
  const [mealsOrDrinks, setMealsOrDrinks] = useState([]);
  // Getter e setter, do requisito 16, para permitir ou recusar redirecionamento conforme quantidade de itens na procura da SearchBar
  const [shouldRedirect, setShouldRedirect] = useState(false);
  // Getter e setter que armazena informações dos RadioButtons e tem como state inicial "ingrediente"
  const [searchType, setSearchType] = useState('ingrediente');
  // Getter e setter que armazena a informação de texto de procura digitado do usuário
  const [searchInputValue, setSearchInputValue] = useState('');

  // Função auxiliar para busca de Categorias de Bebidas
  const requestDrinkCategory = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const result = await response.json();
    // Retorna os valores do result
    setDrinkCategory(result.drinks);
  };
  // Função auxiliar para busca de Categorias de Comidas
  const requestFoodCategory = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const result = await response.json();
    // Retorna os valores do result
    setFoodCategory(result.meals);
  };

  //
  useEffect(() => {
    requestFoodCategory();
    requestDrinkCategory();
  }, []);

  // Função auxiliar, assíncrona, do requisito 25/26 cuja finalidade é fazer um fetch quando iniciar a page Bebidas
  const directRequestDrink = async () => {
    setIsDrinkOrMealLoading(true);
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const result = await response.json();
    setMealsOrDrinks(result.drinks);
    setIsDrinkOrMealLoading(false);
  };

  // Função auxiliar, assíncrona, do requisito 25/26 cuja finalidade é fazer um fetch quando iniciar a page Comidas
  const directRequestFood = async () => {
    setIsDrinkOrMealLoading(true);
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const result = await response.json();
    setMealsOrDrinks(result.meals);
    setIsDrinkOrMealLoading(false);
  };

  // Função assíncrona que recebe como parametro a informação do RadioButton(searchType) e o texto do usuário(searchInputValue)
  const searchBarRequestFood = async (type, inputValue) => {
    try {
      let response = '';
      if (type === 'ingrediente') {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`);
      }
      if (type === 'nome') {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
      }
      if (type === 'primeira letra') {
        if (inputValue.length !== 1) {
          return global.alert('Sua busca deve conter somente 1 (um) caracter');
        }
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`);
      }
      const responseJson = await response.json();
      // Recebe o array de retorno do fetch API que foi executado acima ou retorna um alert de erro que não foi encontrado itens nos filtros
      if (responseJson.meals === null) {
        throw new Error('Nao existem receitas');
      }
      setMealsOrDrinks(responseJson.meals);
    } catch (error) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return error;
    }
  };

  // Comportamento de ComponentDidUpdate, e toda vez que o mealsOrDrinks for alterado, o ShouldRedirect será true.
  useEffect(() => {
    setShouldRedirect(true);
  }, [mealsOrDrinks]);

  // Função assíncrona que recebe como parametro a informação do RadioButton(searchType) e o texto do usuário(searchInputValue)
  const searchBarRequestDrink = async (type, inputValue) => {
    try {
      let response = '';
      if (type === 'ingrediente') {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`);
      }
      if (type === 'nome') {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
      }
      if (type === 'primeira letra') {
        if (inputValue.length !== 1) {
          return global.alert('Sua busca deve conter somente 1 (um) caracter');
        }
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`);
      }
      const responseJson = await response.json();
      // Recebe o array de retorno do fetch API que foi executado acima ou retorna um alert de erro que não foi encontrado itens nos filtros
      if (responseJson.drinks === null) {
        throw new Error('Nao existem receitas');
      }
      setMealsOrDrinks(responseJson.drinks);
    } catch (error) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return error;
    }
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
    setMealsOrDrinks, // Função controla o recebimento de um array de Meals ou Drinks
    shouldRedirect, // Função que permite ou bloqueia o redirecionamento conforme array mealsOrDrinks. Sua alteração é pelo useEffect no Provider
    directRequestFood, // Função para fazer um fetch para abertura de page de Comidas
    isDrinkOrMealLoading, // Controlar Loading dos fetchs de abertura de Comidas e Bebidas
    directRequestDrink, // Função para fazer um fetch para abertura de page de Bebidas
    drinkCategory, // Array de Categorias de Bebidas e Comidas
    setDrinkCategory, // Controlar o array de Categorias de Bebidas e Comidas
    foodCategory, // Array de Categorias de Bebidas e Comidas
    setFoodCategory, // Controlar o array de Categorias de Bebidas e Comidas
    setIsDrinkOrMealLoading, // Controlar o loading de Comidas e Bebidas
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
