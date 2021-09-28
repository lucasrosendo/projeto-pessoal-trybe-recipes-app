import React from 'react';
import Header from '../components/Header';
import CardDone from '../components/CardDone';

import '../styles/DoneRecipes.css';

// Componente Funcional
function DoneRecipes() {
  const verify = () => {
    console.log(localStorage.getItem('doneRecipes'));
    // Se o localStorage não for vazio ou nulo
    if (localStorage.getItem('doneRecipes' !== null)) {
      // GUardo na variável doneRecipes os valores da chave 'doneRecipes' salva no localStorage
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      console.log(doneRecipes);
      return (
        doneRecipes.map((elem, index) => (
          <CardDone key={ index } objDetail={ elem } index={ index } />
        ))
      );
    }
    return <span>Você não tem receitas feitas</span>;
  };

  return (
    <div className="done-recipes-body">
      <div className="background-color" />
      <Header title="Receitas Feitas" search={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      { verify() }
    </div>
  );
}

export default DoneRecipes;
