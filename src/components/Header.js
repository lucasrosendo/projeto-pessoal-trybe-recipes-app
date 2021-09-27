import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// // Importação do PropType com desconstrução das funções
import { string, bool } from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

import '../styles/Header.css';

function Header({ title, search }) {
  // Getter e Setter do renderSearchBar para checagem se a SearchBar será renderizada ou não
  const [renderSearchBar, setRenderSearchBar] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        {/* Redireciona para a página de Perfil */}
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile"
          />
        </Link>
        <h1 data-testid="page-title">
          { title }
        </h1>
        {/* Se o search for verdadeiro o botão de SearchBar será renderizado com o ícone
          conforme requisitos 9 e 10.
          E quando for clicado no botão, será ativado o state RenderSearchBar para executar o
          componente de SearchBar. */}
        {
          search === false
            ? ''
            : (
              <input
                onClick={ () => setRenderSearchBar(!renderSearchBar) }
                type="image"
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="search"
              />
            )
        }
      </div>
      {/* Com o renderSearchBar true então o componente SearchBar é chamado */}
      { renderSearchBar && <SearchBar title={ title } /> }
    </header>
  );
}

// Define por default que o search será true
Header.defaultProps = {
  search: true,
};

Header.propTypes = {
  title: string.isRequired,
  search: bool,
};

export default Header;
