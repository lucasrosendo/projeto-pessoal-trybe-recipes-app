import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

import Loading from '../components/Loading';
import RecommendedList from '../components/RecommendedList';

// Importa os ícones de compartilhar
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function Details() {
  // Importa do Context o state mealsOrDrinks que é um array generico que usamos para trazer as informações da API e salvar nele
  const {
    setShouldRedirect,
    recommendedFood,
    recommendedDrink,
    setRecommendedFood,
    setRecommendedDrink,
  } = useContext(RecipeContext);

  const [objDetail, setObjDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const requestRecommendedDrink = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const result = await response.json();
    setRecommendedDrink(result.drinks);
  };

  const requestRecommendedFood = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const result = await response.json();
    setRecommendedFood(result.meals);
  };

  const requestByID = async () => {
    // const T2 = 2000;
    // Grava no value a informação de pathname do history
    const value = history.location.pathname;
    let response = [];
    // O id será pego após a palavra ('s/') Ex: comida'S/' e bebida'S/'
    const id = value.split('s/')[1];

    setLoading(true);
    if (value.includes('bebidas')) {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      await setObjDetail(responseJson.drinks);
      requestRecommendedDrink();
    }
    if (value.includes('comidas')) {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      await setObjDetail(responseJson.meals);
      requestRecommendedFood();
    }
    setLoading(false);

    // setTimeout(() => {
    //   setLoading(false);
    // }, T2);
  };

  const getIngredients = () => {
    const ingredientes = Object.entries(objDetail[0]);
    const filtering = ingredientes.filter((element) => (
      // Busca por elementos com informação "strIngredient"
      element[0].includes('strIngredient') && element[1] !== null && element[1] !== ''));
    const results = filtering.map((elem, index) => (
      <li key={ elem[1] } data-testid={ `${index}-ingredient-name-and-measure` }>
        {elem[1]}
      </li>
    ));
    return results;
  };

  // Preparando para mostrar na tela um vídeo do Youtube da receita
  const handleYoutube = () => {
    const https = objDetail[0].strYoutube.split('https://www.youtube.com/watch?v=');

    const newHttps = `https://www.youtube.com/embed/${https[1]}`;

    return newHttps;
    // <iframe width="560" height="315" src="https://www.youtube.com/embed/SUtOE_5wPhg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  };

  useEffect(() => {
    requestByID();
    setShouldRedirect(false);
  }, [history.location.pathname]);

  const renderDrink = () => (
    <div className="details">
      <h1 data-testid="recipe-category">{ objDetail[0].strCategory }</h1>
      <h2 data-testid="recipe-title">{ objDetail[0].strDrink }</h2>
      <img
        data-testid="recipe-photo"
        className="food-image"
        src={ objDetail[0].strDrinkThumb }
        alt={ objDetail[0].strDrink }
      />
      <div>
        <input
          type="image"
          data-testid="share-btn"
          src={ shareIcon }
          alt={ objDetail[0].strDrink }
        />
        <input
          type="image"
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt={ objDetail[0].strDrink }
        />
      </div>
      <ol>
        { getIngredients() }
      </ol>
      <p data-testid="instructions">{objDetail[0].strInstructions }</p>
      {/* <iframe
        data-testid="video"
        width="560px"
        height="315px"
        src={ handleYoutube() }
        title="YouTube video player"
      /> */}
      <RecommendedList value={ recommendedDrink } />
      <button
        className="start-recipe-btn"
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );

  // Renderização de detalhes de Comidas by Id
  const renderFood = () => (
    <div className="details">
      <h1 data-testid="recipe-category">{ objDetail[0].strCategory }</h1>
      <h2 data-testid="recipe-title">{ objDetail[0].strMeal }</h2>
      <img
        data-testid="recipe-photo"
        src={ objDetail[0].strMealThumb }
        alt={ objDetail[0].strMeal }
      />
      <div>
        <input
          type="image"
          data-testid="share-btn"
          src={ shareIcon }
          alt={ objDetail[0].strMeal }
        />
        <input
          type="image"
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt={ objDetail[0].strMeal }
        />
      </div>
      <ol>
        { getIngredients() }
      </ol>
      <p data-testid="instructions">{objDetail[0].strInstructions }</p>
      <iframe
        data-testid="video"
        width="560px"
        height="315px"
        src={ handleYoutube() }
        title="YouTube video player"
      />
      <RecommendedList value={ recommendedFood } />
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
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

  if (loading) return <p>Carregando</p>;
  return (
    <div>
      { loading ? <Loading /> : render() }
    </div>
  );
}

export default Details;
