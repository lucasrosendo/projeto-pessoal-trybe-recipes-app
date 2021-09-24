import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function CategoriesFood() {
  const { foodCategory } = useContext(RecipeContext);

  const MIN_CATEG = 5;

  return (
    <div>
      <button type="button">Todos</button>
      { foodCategory.map((elem, index) => {
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


export default CategoriesFood;

