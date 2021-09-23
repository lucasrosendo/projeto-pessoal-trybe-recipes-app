import React from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

function Foods() {
  return (
    <div>
      <Header title="Comidas" />
      <RecipesList />
    </div>
  );
}

export default Foods;
