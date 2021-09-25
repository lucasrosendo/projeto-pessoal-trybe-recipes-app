import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import RecipeContext from '../context/RecipeContext';
import CategoriesDrink from '../components/CategoriesDrink';

function Drinks() {
  const { directRequestDrink, isDrinkOrMealLoading } = useContext(RecipeContext);

  // useEffect com comportamento de ComponentDidMount
  useEffect(() => {
    directRequestDrink();
  }, []);

  return (
    <div>
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
