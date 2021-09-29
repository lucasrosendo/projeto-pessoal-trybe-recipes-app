import React from 'react';
import PropTypes from 'prop-types';

function IngredientsCard({ ingredient, index }) { // componente montado para renderizar os ingredientes tanto de bebidas quanto de comidas
  return (
    <div
      className="ingredients-container"
      data-testid={ `${index}-ingredient-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` }
        alt={ ingredient }
      />
      <span
        data-testid={ `${index}-card-name` }
      >
        { ingredient }
      </span>
    </div>
  );
}

IngredientsCard.propTypes = ({
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
});

export default IngredientsCard;
