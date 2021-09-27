import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DrinkExplore({ history }) {
  const [randomDrinkId, setRandomDrinkId] = useState([]); // variavel que irá armazenar id da bebida após a montagem do componente (conforme useEffect)

  const requestRandomDrink = async () => { // função que faz um fetch para buscar um bebida aleatória, retornando um array
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const request = await fetch(url);
    const response = await request.json();
    return response;
  };

  const redirectToRandomDrink = () => { // função 'handleClick' que será usada no botão 'Me Surpreenda!'
    history.push(`/bebidas/${randomDrinkId}`);
  };

  useEffect(() => { // similar ao ComponentDidMount, realiza a fetch e armazena o id da bebida no estado "randomDrinkId"
    requestRandomDrink()
      .then(({ drinks }) => setRandomDrinkId(drinks[0].idDrink));
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" search={ false } />
      <div
        className="explore-container"
      >
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>

        <button
          onClick={ redirectToRandomDrink }
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

DrinkExplore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default DrinkExplore;
