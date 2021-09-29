import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipeContext';

function IngredientsFoodCard({ ingredient, index }) { // componente montado para renderizar os ingredientes tanto de bebidas quanto de comidas
  const { setFoodsByIngredient,
  } = useContext(RecipesContext);

  const getFoodsByIngredient = async (i) => {
    const element = document.getElementsByClassName('ingredients-container');
    const value = element[i].lastChild.innerText;
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`);
    const { meals } = await request.json();
    setFoodsByIngredient(meals);
  };

  return (
    <Link // transforma a div em Link para redirecionar a rota /comidas - req 77
      to="/comidas"
      className="ingredients-container"
      data-testid={ `${index}-ingredient-card` }
      onClick={ () => getFoodsByIngredient(index) }
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
    </Link>
  );
}

IngredientsFoodCard.propTypes = ({
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
});

export default IngredientsFoodCard;
