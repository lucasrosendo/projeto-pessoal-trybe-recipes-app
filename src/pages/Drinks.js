import React from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <div>
      <Header title="Bebidas" />
      <RecipesList />
      <Footer />
    </div>
  );
}

export default Drinks;
