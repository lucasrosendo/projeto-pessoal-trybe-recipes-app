import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Details.css';
// npm install --save react-copy-to-clipboard
import { CopyToClipboard } from 'react-copy-to-clipboard';

import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Loading from '../components/Loading';
import RecipeContext from '../context/RecipeContext';
import LinkCopied from '../components/LinkCopied';
import ButtonFavorite from '../components/ButtonFavorite';
import ButtonFinish from '../components/ButtonFinish';
import IngredientsCheckbox from '../components/IngredientsCheckbox';

function DetailsInProgress() {
  const TWO_SECONDS = 2000;
  const history = useHistory();
  const urlText = history.location.pathname;
  // Pega o pathname e retira o '/in-progress' - Requisito 51 (LinkCopied)
  const urlDetails = urlText.split('/in-progress');
  const id = urlText.split('/')[2];
  const [objDetail, setObjDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setCopied } = useContext(RecipeContext);

  // Faz uma requisição Fetch através do ID
  const requestByID = async () => {
    let response = [];
    // Se a URL tiver "bebidas" então executa o fetch de bebidas
    if (urlText.includes('bebidas')) {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      await setObjDetail(responseJson.drinks);
    }
    // Se a URL tiver "comidas" então executa o fetch de comidas
    if (urlText.includes('comidas')) {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const responseJson = await response.json();
      await setObjDetail(responseJson.meals);
    }
    setTimeout(() => {
      setLoading(false);
    }, TWO_SECONDS);
  };

  const handleCopied = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, TWO_SECONDS);
  };

  useEffect(() => {
    requestByID();
  }, []);

  // Renderização de detalhes de Bebidas by Id
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
        {/* Requisito 43 - Chama componente CopyToClipboard que foi importado
        da biblioteca react */}
        <CopyToClipboard
          text={ `http://localhost:3000${urlDetails[0]}` }
          onCopy={ () => {
            handleCopied();
          } }
        >
          <input
            type="image"
            data-testid="share-btn"
            src={ shareIcon }
            alt={ objDetail[0].strDrink }
          />
        </CopyToClipboard>
        <LinkCopied />
        {/* Chama o componente de Botão Favorito, conforme requisito 44 e 45.
        Funcionalidades atendem requisitos */}
        <ButtonFavorite urlText={ urlText } objDetail={ objDetail } id={ id } />
      </div>
      {/* Lista os Ingredientes na tela */}
      <IngredientsCheckbox objDetail={ objDetail } id={ id } url={ urlText } />
      <p data-testid="instructions">{objDetail[0].strInstructions}</p>
      <ButtonFinish objDetail={ objDetail } />
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
        {/* Requisito 43 - Chama componente CopyToClipboard que foi importado
        da biblioteca react */}
        <CopyToClipboard
          text={ `http://localhost:3000${urlDetails[0]}` }
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
        <LinkCopied />
        {/* Chama o componente de Botão Favorito, conforme requisito 44 e 45.
        Funcionalidades atendem requisitos */}
        <ButtonFavorite urlText={ urlText } objDetail={ objDetail } id={ id } />
      </div>
      {/* Lista os Ingredientes na tela */}
      <IngredientsCheckbox objDetail={ objDetail } id={ id } url={ urlText } />
      <p data-testid="instructions">{objDetail[0].strInstructions}</p>
      <ButtonFinish objDetail={ objDetail } />
    </div>
  );

  const render = () => {
    const value = history.location.pathname;
    if (value.includes('comidas')) {
      return renderFood();
    }
    if (value.includes('bebidas')) {
      return renderDrink();
    }
  };

  return (
    <div>
      {loading ? <Loading /> : render()}
    </div>
  );
}

export default DetailsInProgress;
