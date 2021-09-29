import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import RecipeContext from '../context/RecipeContext';
import CategoriesDrink from '../components/CategoriesDrink';

import '../styles/Drinks.css';

function Drinks() {
  const { directRequestDrink,
    isDrinkOrMealLoading,
    cameFromIngredient,
    foodsOrDrinksByIngredient,
  } = useContext(RecipeContext);

  const MAX_NUMBER = 12;

  // useEffect com comportamento de ComponentDidMount
  useEffect(() => {
    directRequestDrink();
  }, []);

  const element = !isDrinkOrMealLoading ? (
    <div>
      <RecipesList />
    </div>
  ) : <p>Carregando</p>;

  const drinksByIngredientElement = (
    foodsOrDrinksByIngredient.map((el, i) => {
      if (i < MAX_NUMBER) {
        return (
          <div
            key={ i }
            data-testid={ `${i}-recipe-card` }
          >
            <span
              data-testid={ `${i}-card-name` }
            >
              {el.strDrink}
            </span>
            <img
              data-testid={ `${i}-card-img` }
              src={ el.strDrinkThumb }
              alt={ el.strDrinkThumb }
            />
          </div>
        );
      }
      return '';
    })
  );

  return (
    <div className="bebidas-body">
      <div className="recipes-background-color" />
      <Header title="Bebidas" />
      <CategoriesDrink />
      {
        !cameFromIngredient && element
      }
      {
        cameFromIngredient && drinksByIngredientElement
      }
      <Footer />
    </div>
  );
}

export default Drinks;
