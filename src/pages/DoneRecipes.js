import React, { useState } from 'react';
import Header from '../components/Header';
import CardDone from '../components/CardDone';

import '../styles/DoneRecipes.css';

// Componente Funcional
function DoneRecipes() {
  // Criado estados para Filtrar as receitas por comidas, bebidas ou 'All'
  const [filterType, setFilterType] = useState('All');

  const verify = () => {
    let filtered = []; // filtered começa com array vazio

    // Se o localStorage não for vazio ou nulo
    if (localStorage.getItem('doneRecipes') !== null) {
      // GUardo na variável doneRecipes os valores da chave 'doneRecipes' salva no localStorage
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      if (filterType !== 'All') {
        filtered = doneRecipes.filter((elem) => elem.type === filterType);
      } else {
        filtered = doneRecipes;
      }
      return (
        filtered.map((elem, index) => (
          <CardDone key={ index } objDetail={ elem } index={ index } />
        ))
      );
    }
    return <span>Você não tem receitas feitas</span>;
  };

  const handleClick = (type) => {
    setFilterType(type);
  };

  return (
    <div className="done-recipes-body">
      <div className="background-color" />
      <Header title="Receitas Feitas" search={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClick('All') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleClick('comida') }

        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClick('bebida') }
        >
          Drinks
        </button>
      </div>
      { verify() }
    </div>
  );
}

export default DoneRecipes;
