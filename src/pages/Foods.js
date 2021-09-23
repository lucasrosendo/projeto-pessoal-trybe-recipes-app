import React from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import Footer from '../components/Footer';

function Foods() {
  return (
    <div>
      <Header title="Comidas" />
      <RecipesList />
      <Footer />
    </div>
  );
}

export default Foods;
