import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FoodExplore() {
  return (
    <div>
      <Header title="Explorar Comidas" search={ false } />
      <div
        className="explore-container"
      >
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default FoodExplore;
