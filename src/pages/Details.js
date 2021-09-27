import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

// npm install --save react-copy-to-clipboard
// Biblioteca para copiar algo para copyboard
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Importa os ícones de compartilhar
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import RecipeContext from '../context/RecipeContext';

import Loading from '../components/Loading';
import RecommendedList from '../components/RecommendedList';
import ButtonBegun from '../components/ButtonBegun';
import LinkCopiado from '../components/LinkCopied';
import ButtonFavorite from '../components/ButtonFavorite'

// Importa função para ser embedada na tela de Comidas ou Bebidas
import handleYoutube from '../services/HandleYoutube';

import '../styles/Details.css';

function Details() {
  const history = useHistory();
  // Grava no urlText a informação de pathname do history
  const urlText = history.location.pathname;
  // O id será pego após a palavra ('s/') Ex: comida'S/' e bebida'S/'
  const id = urlText.split('s/')[1];
  const TWO_SECONDS = 2000;
  // Importa do Context o state mealsOrDrinks que é um array generico que usamos para trazer as informações da API e salvar nele
  const {
    setShouldRedirect,
    addStartedRecipes,
    recommendedFood,
    recommendedDrink,
    setRecommendedFood,
    setRecommendedDrink,
    setCopied,
  } = useContext(RecipeContext);

  const [objDetail, setObjDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  // Faz um fetch na API de recomendações de Comidas
  const requestRecommendedFood = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const result = await response.json();
    setRecommendedFood(result.meals);
  };

  // Faz um fetch na API de recomendações de Bebidas
  const requestRecommendedDrink = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const result = await response.json();
    setRecommendedDrink(result.drinks);
  };

  const requestByID = async () => {
    let response = [];

    if (urlText.includes('bebidas')) {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      await setObjDetail(responseJson.drinks);
      requestRecommendedFood();
    }
    if (urlText.includes('comidas')) {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      await setObjDetail(responseJson.meals);
      requestRecommendedDrink();
    }
    setTimeout(() => {
      setLoading(false);
    }, TWO_SECONDS);
  };

  // Cria a função handleCopied para acionar a cópia de link
  const handleCopied = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, TWO_SECONDS);
  };

  const getIngredients = () => {
    const ingredientes = Object.entries(objDetail[0]);

    const measure = ingredientes.filter((elem) => (
      elem[0].includes('strMeasure') && elem[1] !== null && elem[1] !== ''
    ));
    const filtering = ingredientes.filter((element) => (
      // Busca por elemento 'strIngredient'
      element[0].includes('strIngredient') && element[1] !== null && element[1] !== ''));

    const results = filtering.map((elem, index) => (
      <li
        key={ elem[1] }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {elem[1]}
        <span>{measure[index] === undefined ? '' : measure[index][1]}</span>
      </li>));

    return results;
  };

  useEffect(() => {
    requestByID();
    setShouldRedirect(false);
  }, [history.location.pathname]);

  const renderDrink = () => (
    <div className="details">
      <h1
        data-testid="recipe-category"
      >
        {`${objDetail[0].strCategory} (${objDetail[0].strAlcoholic})`}
      </h1>
      <h2 data-testid="recipe-title">{objDetail[0].strDrink}</h2>
      <img
        data-testid="recipe-photo"
        className="food-image"
        src={ objDetail[0].strDrinkThumb }
        alt={ objDetail[0].strDrink }
      />
      <div>
        <CopyToClipboard
          text={ `http://localhost:3000${urlText}` }
          onCopy={ handleCopied }
        >
          <input
            type="image"
            data-testid="share-btn"
            src={ shareIcon }
            alt={ objDetail[0].strDrink }
          />
        </CopyToClipboard>
        <LinkCopiado />
        <ButtonFavorite urlText={ urlText } objDetail={ objDetail } id={ id } />
      </div>
      <ol className="ingredient-list">
        { getIngredients() }
      </ol>
      <p data-testid="instructions">{objDetail[0].strInstructions}</p>
      <RecommendedList value={ recommendedFood } />
      <ButtonBegun
        onClick={ () => addStartedRecipes(id) }
        id={ id }
        objDetail={ objDetail }
      />
    </div>
  );

  // Renderização de detalhes de Comidas by Id
  const renderFood = () => (
    <div className="details">
      <h1 data-testid="recipe-category">{objDetail[0].strCategory}</h1>
      <h2 data-testid="recipe-title">{objDetail[0].strMeal}</h2>
      <img
        data-testid="recipe-photo"
        src={ objDetail[0].strMealThumb }
        alt={ objDetail[0].strMeal }
      />
      <div>
        <CopyToClipboard
          text={ `http://localhost:3000${urlText}` }
          onCopy={ () => {
            handleCopied();
          } }
        >
          <input
            type="image"
            data-testid="share-btn"
            src={ shareIcon }
            alt={ objDetail[0].strMeal }
          />
        </CopyToClipboard>
        <LinkCopiado />
        <ButtonFavorite urlText={ urlText } objDetail={ objDetail } id={ id } />
      </div>
      <ol className="ingredient-list">
        { getIngredients() }
      </ol>
      <iframe
        data-testid="video"
        width="300px"
        height="200px"
        src={ handleYoutube(objDetail[0]) }
        title="YouTube video player"
      />
      <p data-testid="instructions">{objDetail[0].strInstructions}</p>
      <RecommendedList value={ recommendedDrink } />
      <ButtonBegun
        onClick={ () => addStartedRecipes(id) }
        id={ id }
        objDetail={ objDetail }
      />
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

  return (
    <div>
      { loading ? <Loading /> : render() }
    </div>
  );
}

export default Details;
