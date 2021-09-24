import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function CategoriesDrink() {
  // Importa do context o drinkCategory para pegar as categorias de Bebidas, o setIsDrinkOrMealLoading para indicar que as Bebidas estão carregando e o setMealsOrDrinks para setar o novo array de Bebidas
  const {
    drinkCategory,
    setIsDrinkOrMealLoading,
    setMealsOrDrinks,
  } = useContext(RecipeContext);

  // Pegar no máximo 5 categorias e colocar na tela
  const MIN_CATEG = 5;

  // Fetch que faz a busca na API usando o filtro conforme value(que é o botão clicado)
  const fetchFilterCategory = async (value) => {
    let URL_API = '';
    if (value === 'All') {
      URL_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='; // Link que lista tudo
    } else {
      URL_API = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`; // Link que lista conforme filtro
    }
    setIsDrinkOrMealLoading(true);
    const response = await fetch(URL_API);
    const result = await response.json();
    setMealsOrDrinks(result.drinks);
    setIsDrinkOrMealLoading(false);
  };

  return (
    <div>
      <button
        type="button"
        value="All"
        onClick={ ({ target }) => fetchFilterCategory(target.value) }
      >
        All
      </button>

      {/* Percorre as categorias de Bebidas pegando até no máximo 5 categorias
       conforme MIN_CATEG */}
      { drinkCategory.map((elem, index) => {
        if (index < MIN_CATEG) {
          return (
            <button
              data-testid={ `${elem.strCategory}-category-filter` }
              type="button"
              value={ elem.strCategory }
              key={ elem.strCategory }
              // Ao clicar no botão, será acionado a função fetchFilterCategory passando a ela o value como parametro, que é o botão clicado
              onClick={ ({ target }) => fetchFilterCategory(target.value) }
            >
              { elem.strCategory }
            </button>
          );
        }
        return '';
      })}
    </div>
  );
}

export default CategoriesDrink;
