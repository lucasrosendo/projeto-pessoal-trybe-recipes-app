import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DrinkExplore() {
  return (
    <div>
      <Header title="Explorar Bebidas" search={false} />
      <div
        className="explore-container"
      >
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
        { /*<button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button> */  }
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

export default DrinkExplore;
