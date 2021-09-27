import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FoodExplore({ history }) {
  const [randomFoodId, setRandomFoodId] = useState([]); // variavel que irá armazenar id da comida após a montagem do componente (conforme useEffect)

  const requestRandomFood = async () => { // função que faz um fetch para buscar uma comida aleatória, retornando um array
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const request = await fetch(url);
    const response = await request.json();
    return response;
  };

  const redirectToRandomFood = () => { // função 'handleClick' que será usada no botão 'Me Surpreenda!'
    history.push(`/comidas/${randomFoodId}`);
  };

  useEffect(() => { // similar ao ComponentDidMount, realiza a fetch e armazena o id da bebida no estado "randomDrinkId
    requestRandomFood()
      .then(({ meals }) => setRandomFoodId(meals[0].idMeal));
  }, []);

  return (
    <div>
      <Header title="Explorar Comidas" search={ false } />
      <div
        className="explore-container"
      >
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        <button
          onClick={ redirectToRandomFood }
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

FoodExplore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default FoodExplore;
