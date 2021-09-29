import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import setFavorites, { isfavoriteRecipe } from '../services/setFavorites';

function ButtonFavorite({ objDetail, urlText, id }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Com a renderização do botão, é executado a função isfavoriteRecipe, passando como parametro o id da comida/bebida
  useEffect(() => {
    isfavoriteRecipe(id, setIsFavorite);
  }, []);

  // Retira do fatorito o id específico
  const removeFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const updatedFavorites = favoriteRecipes.filter((elem) => elem.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    // Chava a função isfavoriteRecipe, conforme parametros
    isfavoriteRecipe(id, setIsFavorite);
  };

  const onClickFavorite = () => {
    if (isFavorite === true) {
      return removeFavorite();
    }
    return setFavorites(objDetail[0], urlText, id, setIsFavorite);
  };

  return (
    // Renderiza na tela o ícone de Favoritos('ícone Coração')
    <input
      className="favorite-btn"
      onClick={ () => onClickFavorite() }
      type="image"
      data-testid="favorite-btn"
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      alt="foto do item"
    />
  );
}

ButtonFavorite.propTypes = {
  objDetail: PropTypes.shape(
    PropTypes.any,
  ).isRequired,
  urlText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonFavorite;
