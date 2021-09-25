import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';
import CategoriesFood from '../components/CategoriesFood';

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
          </div>) : <p>Carregando</p>
      }
      <Footer />
    </div>
  );
}

export default Foods;
