import React, { useEffect, useContext } from 'react';
import CategoriesFood from '../components/CategoriesFood';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesList from '../components/RecipesList';
import RecipeContext from '../context/RecipeContext';

function Foods() {
  const { directRequestFood, isDrinkOrMealLoading } = useContext(RecipeContext);

  // useEffect com comportamento de ComponentDidMount
  useEffect(() => {
    directRequestFood();
  }, []);

  return (
    <div>
      <Header title="Comidas" />
      <CategoriesFood />
      {
        !isDrinkOrMealLoading ? (
          <div>
            <RecipesList />
          </div>
        ) : <p>Carregando</p>
      }
      <Footer />
    </div>
  );
}

export default Foods;
