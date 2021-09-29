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
  } = useContext(RecipeContext);

  // useEffect com comportamento de ComponentDidMount
  useEffect(() => {
    console.log(cameFromIngredient);
  }, []);

  return (
    <div className="bebidas-body">
      <div className="recipes-background-color" />
      <Header title="Bebidas" />
      <CategoriesDrink />
      {
        !isDrinkOrMealLoading ? (
          <div>
            <RecipesList />
          </div>) : <p>Carregando</p>
      }
      <Footer />
    </div>
  );
}

export default Drinks;
