import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';

function FoodExploreIngredients() {
  const [foodIngredients, setfoodIngredients] = useState([]); // variavel que irá armazenar o array com o nome das bebidas após a montagem do componente (conforme useEffect)
  const MAX_NUMBER = 12;
  const { setCameFromIngredient, setFoodsByIngredient } = useContext(RecipeContext);

  const getFoodsByIngredient = async (i) => {
    const element = document.getElementsByClassName('ingredients-container');
    const value = element[i].lastChild.innerText;
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`);
    const { meals } = await request.json();
    setFoodsByIngredient(meals);
  };

  const requestFoodIngredients = async () => { // função que faz um fetch para buscar uma lista de ingredientes, retornando um array
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const request = await fetch(url);
    const { meals } = await request.json();
    setfoodIngredients(meals);
  };

  useEffect(() => {
    requestFoodIngredients();
    return (() => {
      setCameFromIngredient(true);
    });
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" search={ false } />
      {foodIngredients.map((el, index) => {
        if (index < MAX_NUMBER) {
          return (
            <Link // transforma a div em Link para redirecionar a rota /comidas - req 77
              key={ index }
              to="/comidas"
              className="ingredients-container"
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => getFoodsByIngredient(index) }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png` }
                alt={ el.strIngredient }
              />
              <span
                data-testid={ `${index}-card-name` }
              >
                { el.strIngredient }
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

export default FoodExploreIngredients;
