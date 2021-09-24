import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function CategoriesDrink() {
  const { drinkCategory } = useContext(RecipeContext);

  const MIN_CATEG = 5;

  return (
    <div>
      <button type="button">Todos</button>
      { drinkCategory.map((elem, index) => {
        if (index < MIN_CATEG) {
          return (
            <button
              data-testid={ `${elem.strCategory}-category-filter` }
              type="button"
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
