import React, { useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';
import LinkCopied from './LinkCopied';
import blackHeartIcon from '../images/blackHeartIcon.svg';

// Usando o mesmo CSS do CardDone
import '../styles/CardDone.css';

function CardFavorite({ objDetail, index }) {
  const { setCopied, setReceitasFav } = useContext(RecipeContext);
  const TWO_SECONDS = 2000;

  const handleCopied = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, TWO_SECONDS);
  };

  // Função para remoção do Favorito
  const removeFavorite = () => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      // Guarda na variável favoriteRecipes todas as informações do localStorage com chave 'favoriteRecipes'
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      // Guarda na variável updatedFavorites todas as informações, conforme filtro, que não pertencem ao id em específico passado abaixo
      const updatedFavorites = favoriteRecipes.filter((elem) => elem.id !== objDetail.id);
      // Atualiza localStorage
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setReceitasFav(updatedFavorites);
    }
  };

  const render = () => (
    <div className="done-card-body">
      <Link to={ `/${objDetail.type}s/${objDetail.id}` }>
        <h1
          data-testid={ `${index}-horizontal-name` }
        >
          {objDetail.name}
        </h1>
      </Link>

      <div className="card-content">
        <Link to={ `/${objDetail.type}s/${objDetail.id}` }>
          <img
            src={ objDetail.image }
            alt={ objDetail.name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>

        <section>
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >

            <p>
              {objDetail.area}
              {objDetail.area && ' - '}
              {objDetail.category}
            </p>
            <p>
              {objDetail.alcoholicOrNot}
            </p>

          </h3>

          <CopyToClipboard
            text={ `http://localhost:3000/${objDetail.type}s/${objDetail.id}` }
            onCopy={ () => {
              handleCopied();
            } }
          >
            <input
              className="share-btn"
              type="image"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ objDetail.id }
            />
          </CopyToClipboard>
          <LinkCopied />
          <input
            className="favorite-btn"
            type="image"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => removeFavorite() }
            src={ blackHeartIcon }
            alt="favorite-btn"
          />
        </section>
      </div>
    </div>
  );

  return render();
}

export default CardFavorite;
