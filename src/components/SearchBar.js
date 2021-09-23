// Importando o hook useContext do react
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Importanndo o Context para utilizar os states do Context
import RecipeContext from '../context/RecipeContext';

// Componente funcional de SearchBar
function SearchBar({ title }) {
  const {
    searchType, // Informação dos Radio Buttons, conforme option checked
    setSearchType,
    searchInputValue, // Informação de campo de input de procura
    setSearchInputValue,
    searchBarRequestFood, // Função que está no Context e receberá as informações de busca da SearchBar conforme usuário definiu na tela
    searchBarRequestDrink, // Função que está no Context e receberá as informações de busca da SearchBar conforme usuário definiu na tela
  } = useContext(RecipeContext);

  // Função auxiliar para redirecionar, conforme título no Header('Comidas' ou 'Bebidas'), a função API que está no RecipeContext
  const requestAPI = (value) => {
    if (value === 'Comidas') {
      searchBarRequestFood(searchType, searchInputValue);
    }
    if (value === 'Bebidas') {
      searchBarRequestDrink(searchType, searchInputValue);
    }
  };

  return (
    <div>
      {/* Barra de Procura da SearchBar */}
      <input
        type="text"
        data-testid="search-input"
        value={ searchInputValue }
        onChange={ ({ target }) => setSearchInputValue(target.value) }
      />
      <label htmlFor="ingrediente">
        <input
          type="radio"
          name="searchRadio"
          id="ingrediente"
          data-testid="ingredient-search-radio"
          value="ingrediente"
          checked
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        Ingrediente
      </label>
      <label htmlFor="nome">
        <input
          type="radio"
          name="searchRadio"
          id="nome"
          data-testid="name-search-radio"
          value="nome"
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        Nome
      </label>
      <label htmlFor="primeira-letra">
        <input
          type="radio"
          name="searchRadio"
          id="primeira-letra"
          data-testid="first-letter-search-radio"
          value="primeira letra"
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        Primeira Letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        // Quando clicar no botão de Buscar, a searchBarRequest irá ser executada guardando as informações de searchType(ingrediente, nome ou primeira letra) e searchInputValue(texto digitado pelo usuário)
        onClick={ () => requestAPI(title) }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
