import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ButtonBegun({ id }) {
  const history = useHistory();

  // Primeira informação que o Botão Iniciar Receita vai ter é "Iniciar Receita", com base nele será alterado
  const iniciarReceita = 'Iniciar Receita';

  // Cria os states buttonName e setButtonName, usando como State Inicial a variável definida acima
  const [buttonName, setButtonName] = useState(iniciarReceita);

  // Guarda na variável value o pathname conforme histórico de navegação
  const value = history.location.pathname;

  // Guarda no LocalStorage os Ingredientes na chave 'inProgressRecipes'
  const setLocalStoragesIngredients = () => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      // Salva na variável "sem" os valores que estão na chave "inProgressRecipes" que está guardado no localStorage
      const sem = localStorage.getItem('inProgressRecipes');
      // Salva na variável abaixo a informação JSON tratada buscada acima
      const inProgress = JSON.parse(sem);
      // Se o value, conforme pathname, é de comidas, então..
      if (value.includes('comidas')) {
        // Salva no localStorage, chave "inProgressRecipes", as informações que já possuem(spread ...inProgress) e as informações adicionais como objeto
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...inProgress,
          meals: {
            ...inProgress.meals,
            [id]: [],
          },
        }));
      }
      // Se o value, conforme pathname, é de comidas, então..
      if (value.includes('bebidas')) {
        // Salva no localStorage, chave "inProgressRecipes", as informações que já possuem(spread ...inProgress) e as informações adicionais como objeto
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          ...inProgress,
          cocktails: {
            ...inProgress.cocktails,
            [id]: [],
          },
        }));
      }
    } else {
      // Se o value, conforme pathname, é de comidas, então..
      if (value.includes('comidas')) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          meals: {
            [id]: [],
          },
          cocktails: {},
        }));
      }
      // Se o value, conforme pathname, é de bebidas, então..
      if (value.includes('bebidas')) {
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: {
            [id]: [],
          },
          meals: {},
        }));
      }
    }
  };

  // Função de verificar o ID
  const verifyId = () => {
    let newArray = [];
    // Se houver no localStorage a chave "inProgressRecipes", então...
    if (localStorage.getItem('inProgressRecipes') !== null) {
      // Guarda na variável "inProgress" os valores da chave "inProgressRecipes"
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      // Se o value, conforme pathname, é de comidas, então..
      if (value.includes('comidas')) {
        // Guarda na variável "novaVariavelFood" as chaves encontradas no inProgress.meals
        const novaVariavelFood = Object.keys(inProgress.meals);
        // Salva no newArray estas chaves pegas acima
        newArray = [...novaVariavelFood];
      }
      // Se o value, conforme pathname, é de bebidas, então..
      if (value.includes('bebidas')) {
        // Guarda na variável "novaVariavelFood" as chaves encontradas no inProgress.cocktails
        const novaVariavelFood = Object.keys(inProgress.cocktails);
        // Salva no newArray estas chaves pegas acima
        newArray = [...novaVariavelFood];
      }
    }
    // Retorna o newArray criado
    return newArray;
  };

  // Função de redirecionamento conforme value pego no pathname do histórico de navegação
  const handleRedirect = () => {
    if (value.includes('comidas')) {
      history.push(`/comidas/${id}/in-progress`);
    }
    if (value.includes('bebidas')) {
      history.push(`/bebidas/${id}/in-progress`);
    }
  };

  // Quando o botão de Iniciar Receita for renderizado na tela, é executado uma verificação se o ID existe no localStorage, conforme função executada para essa finalidade. E encontrando o ID, o botão terá o texto "Continuar Receita"
  useEffect(() => {
    setButtonName(verifyId().some((elem) => elem === id)
      ? 'Continuar Receita' : iniciarReceita);
  }, []);

  return (
    <div>
      <button
        className="start-recipe-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => {
          // Guarda no LocalStorage os Ingredientes na chave 'inProgressRecipes'
          setLocalStoragesIngredients();
          // Verifica se o texto do botão será "Iniciar Receita" ou "Continuar Receita"
          setButtonName(verifyId().some((elem) => elem === id)
            ? 'Continuar Receita' : iniciarReceita);
          // Direciona para a tela in-progess conforme pathname
          handleRedirect();
        } }
      >
        {/* Renderiza o texto */}
        {buttonName}
      </button>
    </div>
  );
}

ButtonBegun.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ButtonBegun;
