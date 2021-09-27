import React from 'react';
import { shape, string, number } from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

function RecommendedCard({ index, card }) {
  const history = useHistory();

  const renderDrink = () => {
    // Desconstrói pegando o nome do drink, a imagem e o id do drink, vindo de card(props)
    const { strDrink, strDrinkThumb, idDrink } = card;

    return (
      <Link to={ `/bebidas/${idDrink}` }>
        <div
          className="recommended-card"
          data-testid={ `${index}-recomendation-card` }
        >
          <h1 data-testid={ `${index}-recomendation-title` }>{strDrink}</h1>
          <img
            className="recommended-image"
            data-testid={ `${index}-card-img` }
            src={ strDrinkThumb }
            alt={ strDrink }
          />
        </div>
      </Link>
    );
  };

  const renderFood = () => {
    // Desconstrói pegando o nome do drink, a imagem e o id do drink, vindo de card(props)
    const { strMeal, strMealThumb, idMeal } = card;

    return (
      <Link to={ `/comidas/${idMeal}` }>
        <div
          className="recommended-card"
          data-testid={ `${index}-recomendation-card` }
        >
          <h1
            data-testid={ `${index}-recomendation-title` }
            className="food-title"
          >
            {strMeal}
          </h1>
          <img
            className="recommended-image"
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt={ strMeal }
          />
        </div>
      </Link>
    );
  };

  const render = () => {
    // Descobre se no link há informação de '/comidas' ou '/bebidas' para gerar a renderização
    const value = history.location.pathname;
    // Se no link tiver 'comidas', renderiza renderFood
    if (value.includes('comidas')) {
      return renderDrink();
    }
    // Se no link tiver 'bebidas', renderiza renderDrink
    if (value.includes('bebidas')) {
      return renderFood();
    }
  };

  return (
    <div data-testid={ `${index}-recipe-card` }>
      { render() }
    </div>
  );
}

RecommendedCard.propTypes = {
  index: number.isRequired,
  card: shape({
    strDrink: string,
    strDrinkThumb: string,
    strMeal: string,
    strMealThumb: string,
    idMeal: string,
    idDrink: string,
  }).isRequired,
};

export default RecommendedCard;
