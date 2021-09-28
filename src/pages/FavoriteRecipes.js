import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';
import RecipeContext from '../context/RecipeContext';

import '../styles/DoneRecipes.css';

function FavoriteRecipes() {
  // Criado estados para Filtrar as receitas por comidas, bebidas ou 'All'
  const [filterType, setFilterType] = useState('All');
  const { receitasFav, setReceitasFav } = useContext(RecipeContext);

  const verify = () => {
    let filtered = []; // filtered começa com array vazio

    const favoriteRecipes = receitasFav;
    if (filterType !== 'All') {
      filtered = favoriteRecipes.filter((elem) => elem.type === filterType);
    } else {
      filtered = favoriteRecipes;
    }
    return filtered;
  };

  const handleClick = (type) => {
    setFilterType(type);
  };

  const getInformation = (callback) => {
    if ((localStorage.getItem('favoriteRecipes') !== null)) {
      callback(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  };

  useEffect(() => {
    getInformation(setReceitasFav);
  }, []);

  return (
    <div className="done-recipes-body">
      <div className="background-color" />
      <Header title="Receitas Favoritas" search={ false } />
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
      { verify().map((elem, index) => (
        <CardFavorite key={ index } objDetail={ elem } index={ index } />
      ))}
    </div>
  );
}

export default FavoriteRecipes;
