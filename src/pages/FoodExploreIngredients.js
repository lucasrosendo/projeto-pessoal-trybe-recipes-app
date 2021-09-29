import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientsFoodCard from '../components/IngredientsFoodCard';

function FoodExploreIngredients() {
  const [foodIngredients, setfoodIngredients] = useState([]); // variavel que irá armazenar o array com o nome das bebidas após a montagem do componente (conforme useEffect)
  const MAX_NUMBER = 12;

  const requestFoodIngredients = async () => { // função que faz um fetch para buscar uma lista de ingredientes, retornando um array
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const request = await fetch(url);
    const response = await request.json();
    return response;
  };

  useEffect(() => {
    requestFoodIngredients()
      .then(({ meals }) => setfoodIngredients(meals));
  });

  return (
    <div>
      <Header title="Explorar Ingredientes" search={ false } />
      {foodIngredients.map((el, i) => {
        if (i < MAX_NUMBER) {
          return (
            <IngredientsFoodCard
            //  componente que renderiza cada card de comidas (imagem e nome)
              key={ i }
              ingredient={ el.strIngredient }
              index={ i }
            />
          );
        }
        return '';
      })}
      <Footer />
    </div>
  );
}

export default FoodExploreIngredients;
