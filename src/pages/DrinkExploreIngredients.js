import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';

function DrinkExploreIngredients() {
  const [drinkIngredients, setDrinkIngredients] = useState([]); // variavel que irá armazenar o array com o nome das bebidas após a montagem do componente (conforme useEffect)
  const MAX_NUMBER = 12;
  const { setCameFromIngredient,
    setFoodsOrDrinksByIngredient } = useContext(RecipeContext);

  const getDrinksByIngredient = async (i) => {
    const element = document.getElementsByClassName('ingredients-container');
    const value = element[i].lastChild.innerText;
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`);
    const { drinks } = await request.json();
    setFoodsOrDrinksByIngredient(drinks);
  };

  const requestDrinkIngredients = async () => { // função que faz um fetch para buscar uma lista de ingredientes, retornando um array
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const request = await fetch(url);
    const response = await request.json();
    return response;
  };

  useEffect(() => {
    requestDrinkIngredients()
      .then(({ drinks }) => setDrinkIngredients(drinks));
    return (() => {
      setCameFromIngredient(true);
    });
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" search={ false } />
      {drinkIngredients.map((el, index) => {
        if (index < MAX_NUMBER) {
          return (
            <Link
              key={ index }
              to="/bebidas"
              className="ingredients-container"
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => getDrinksByIngredient(index) }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png` }
                alt={ el.strIngredient1 }
              />
              <span
                data-testid={ `${index}-card-name` }
              >
                { el.strIngredient1 }
              </span>
            </Link>
          );
        }
        return '';
      })}
      <Footer />
    </div>
  );
}

export default DrinkExploreIngredients;
