import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';

function Drinks() {
  const { directRequestDrink, isDrinkOrMealLoading } = useContext(RecipeContext);

  // useEffect com comportamento de ComponentDidMount
  useEffect(() => {
    directRequestDrink();
  }, [directRequestDrink]);

  return (
    <div>
      <Header title="Bebidas" />
      { !isDrinkOrMealLoading ? <RecipesList /> : <p>Carregando</p> }
      <Footer />
    </div>
  );
}

export default Drinks;
