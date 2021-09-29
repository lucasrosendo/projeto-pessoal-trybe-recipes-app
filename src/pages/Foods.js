import React, { useEffect, useContext } from 'react';
import CategoriesFood from '../components/CategoriesFood';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesList from '../components/RecipesList';
import RecipeContext from '../context/RecipeContext';

import '../styles/Foods.css';

function Foods() {
  const { directRequestFood,
    isDrinkOrMealLoading,
    cameFromIngredient,
    foodsOrDrinksByIngredient,
  } = useContext(RecipeContext);

  // useEffect com comportamento de ComponentDidMount
  useEffect(() => {
    directRequestFood();
  }, []);

  const element = !isDrinkOrMealLoading ? (
    <div>
      <RecipesList />
    </div>
  ) : <p>Carregando</p>;

  const foodsByIngredientElement = (
    foodsOrDrinksByIngredient.map((el, i) => (
      <div
        key={ i }
        data-testid={ `${i}-recipe-card` }
      >
        <span
          data-testid={ `${i}-card-name` }
        >
          {el.strMeal}
        </span>
        <img
          data-testid={ `${i}-card-img` }
          src={ el.strMealThumb }
          alt={ el.strMealThumb }
        />
      </div>
    ))
  );

  return (
    <div className="comidas-body">
      <Header title="Comidas" />
      <div className="recipes-background-color" />
      <CategoriesFood />
      {
        !cameFromIngredient && element
      }
      {
        cameFromIngredient && foodsByIngredientElement
      }
      <Footer />
    </div>
  );
}

export default Foods;
