// Importando o hook useContext do react
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
// Importanndo o Context para utilizar os states do Context
import { string } from 'prop-types';
import RecipeContext from '../context/RecipeContext';

// Componente funcional de SearchBar
function SearchBar(props) {
  const { title } = props;
  const {
    setSearchType,
    setSearchInputValue,
    searchInputValue, // Informação de campo de input de procura
    searchType, // Informação dos Radio Buttons, conforme option checked
    searchBarRequestDrink, // Função que está no Context e receberá as informações de busca da SearchBar conforme usuário definiu na tela
    searchBarRequestFood, // Função que está no Context e receberá as informações de busca da SearchBar conforme usuário definiu na tela
    mealsOrDrinks, // Informação para receber o array com as Comidas do Fetch
    shouldRedirect, // Booleano para permitir redirecionamento conforme informação do array Meals
  } = useContext(RecipeContext);

  // A variável history vai receber do hook useHistory as informações de History do componente
  const history = useHistory();

  // Função auxiliar para redirecionar, conforme título no Header('Comidas' ou 'Bebidas'), a função API que está no RecipeContext
  const requestAPI = async (value) => {
    if (value === 'Comidas') {
      await searchBarRequestFood(searchType, searchInputValue);
    }
    if (value === 'Bebidas') {
      await searchBarRequestDrink(searchType, searchInputValue);
    }
  };

  const redirect = (value) => {
    if (mealsOrDrinks.length === 1) {
      if (value === 'Comidas') {
        history.push(`/comidas/${mealsOrDrinks[0].idMeal}`);
      }
      if (value === 'Bebidas') {
        history.push(`/bebidas/${mealsOrDrinks[0].idDrink}`);
      }
    }
  };

  return (
    <div className="search-body">
      { shouldRedirect && redirect(title)}
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
          defaultChecked
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

SearchBar.propTypes = {
  title: string.isRequired,
};

export default SearchBar;
