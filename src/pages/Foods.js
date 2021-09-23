import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import Footer from '../components/Footer';
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
      { !isDrinkOrMealLoading ? <RecipesList /> : <p>Carregando</p> }
      <Footer />
    </div>
  );
}

export default Foods;
