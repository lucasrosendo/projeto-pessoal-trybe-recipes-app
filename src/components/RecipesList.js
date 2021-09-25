import React, { useContext } from 'react';
import Card from './Card';
import RecipeContext from '../context/RecipeContext';

function RecipesList() {
  // Limitando a quantidade de itens Card renderizados na tela
  const MAX_ITEMS = 12; // Requisito 17

  // Importando do context o state mealsOrDrinks que tem a informação do array contendo os itens buscados
  const { mealsOrDrinks } = useContext(RecipeContext);

  return (
    <div>
      {
        mealsOrDrinks
          .map((elemento, index) => {
            // Se o index for menor que o MAX_ITEMS, então renderiza na tela
            if (index < MAX_ITEMS) {
              return <Card key={ index } card={ elemento } index={ index } />;
            }
            // Se caso cair no return null o map é automaticamente parado e não é mais nada renderizado
            return '';
          })
      }
    </div>
  );
}

export default RecipesList;
