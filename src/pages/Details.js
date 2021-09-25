import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function Details() {
  // Importa do Context o state mealsOrDrinks que é um array generico que usamos para trazer as informações da API e salvar nele
  const { mealsOrDrinks } = useContext(RecipeContext);
  const history = useHistory();

  const renderDrink = () => (
    // Pega o título do primeiro Drink do array
    <h1>{ mealsOrDrinks[0].strDrink }</h1>
  );

  const renderFood = () => (
  // Pega o título da primeira Comida do array
    <h1>{ mealsOrDrinks[0].strMeal }</h1>
  );

  const render = () => {
    // Descobre se no link há informação de '/comidas' ou '/bebidas' para gerar a renderização
    const value = history.location.pathname;
    // Se no link tiver 'comidas', renderiza renderFood
    if (value.includes('comidas')) {
      return renderFood();
    }
    // Se no link tiver 'bebidas', renderiza renderDrink
    if (value.includes('bebidas')) {
      return renderDrink();
    }
  };

  return (
    <div>
      { render()}
    </div>
  );
}

export default Details;
