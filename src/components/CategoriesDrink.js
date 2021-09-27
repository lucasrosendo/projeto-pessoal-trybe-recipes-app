import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function CategoriesDrink() {
  // Importa do context o drinkCategory para pegar as categorias de Bebidas, o setIsDrinkOrMealLoading para indicar que as Bebidas estão carregando e o setMealsOrDrinks para setar o novo array de Bebidas
  const {
    drinkCategory,
    setMealsOrDrinks,
    setIsDrinkOrMealLoading,
    directRequestDrink,
  } = useContext(RecipeContext);

  // Pegar no máximo 5 categorias e colocar na tela
  const MIN_CATEG = 5;

  // Fetch que faz a busca na API usando o filtro conforme value(que é o botão clicado)
  const fetchCategory = async (value) => {
    setIsDrinkOrMealLoading(true);
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`);
    const result = await response.json();
    setMealsOrDrinks(result.drinks);
    setIsDrinkOrMealLoading(false);
  };

  return (
    <div className="categorias">
      <button
        onClick={ () => directRequestDrink() }
        data-testid="All-category-filter"
        type="button"
      >
        All
      </button>

      {/* Percorre as categorias de Bebidas pegando até no máximo 5 categorias
       conforme MIN_CATEG */}
      { drinkCategory.map((elem, index) => {
        if (index < MIN_CATEG) {
          return (
            <button
              className=".drink-btn"
              data-testid={ `${elem.strCategory}-category-filter` }
              type="button"
              value={ elem.strCategory }
              // Ao clicar no botão, será acionado a função fetchFilterCategory passando a ela o value como parametro, que é o botão clicado
              onClick={ ({ target }) => {
                target.firstChild.checked = !target.firstChild.checked;
                return (
                  target.firstChild.checked
                    ? fetchCategory(target.value) : directRequestDrink());
              } }
              key={ elem.strCategory }
            >
              <input style={ { display: 'none' } } type="checkbox" />
              {elem.strCategory}
            </button>
          );
        }
        return '';
      })}
    </div>
  );
}

export default CategoriesDrink;
