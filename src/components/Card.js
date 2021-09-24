// Importa o propTrypes descontruindo as funções necessárias
import { number, shape, string } from 'prop-types';
import React from 'react';
// Importando o hook useHistory para buscar o pathname que indicará se é comida ou bebida
import { useHistory } from 'react-router-dom';

// Componente funcional que recebe como props o elemento card e o index, vindo de uma HOF Map
function Card({ card, index }) {
  const history = useHistory();
  // Função auxiliar para renderizar card de Drink
  const renderDrink = () => {
    // Descontruindo o strDrink e strDrinkThumb que estão no elemento card, e são chaves do elemento card
    const { strDrink, strDrinkThumb } = card;

    return (
      <div>
        <h1
          className="food-title"
          data-testid={ `${index}-card-name` }
        >
          { strDrink }
        </h1>
        <img
          className="food-image"
          data-testid={ `${index}-card-img` }
          src={ strDrinkThumb }
          alt={ strDrink }
        />
      </div>
    );
  };

  // Função auxiliar para renderizar card de Drink
  const renderFood = () => {
    // Descontruindo o strMeal e strMealThumb que estão no elemento card, e são chaves do elemento card
    const { strMeal, strMealThumb } = card;
    return (
      <div>
        <h1
          data-testid={ `${index}-card-name` }
        >
          { strMeal }
        </h1>
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb }
          alt={ strMeal }
        />
      </div>
    );
  };

  // Função auxiliar para renderizar 'Comida' ou 'Bebida', conforme pathname
  const render = () => {
    const value = history.location.pathname;
    // Se o link armazenado acima no value contém "comidas"
    if (value.includes('comidas')) {
      return renderFood();
    }
    if (value.includes('bebidas')) {
      return renderDrink();
    }
  };

  return (
    <div data-testid={ `${index}-recipe-card` }>
      {/* Executa a função auxiliar criada */}
      { render() }
    </div>
  );
}

Card.propTypes = {
  index: number.isRequired,
  card: shape({
    strDrink: string,
    strDrinkThumb: string,
    strMeal: string,
    strMealThumb: string,
  }).isRequired,
};

export default Card;
