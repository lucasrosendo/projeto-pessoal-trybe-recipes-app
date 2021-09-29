import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import DrinkExplore from '../pages/DrinkExplore';

const EXPLORE_BY_INGREDIENT = 'explore-by-ingredient';
const EXPLORE_BY_AREA = 'explore-by-area';

describe('1 - Verifica os elementos presentes no Header', () => {
  test('Verifica se o título está presente e contém o texto "Bebidas"', () => {
    const { getByTestId } = renderWithRouter(<DrinkExplore
      title="Explorar Bebidas"
      visible={ false }
    />);

    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Explorar Bebidas');
  });
  test('Verifica de exite o botão perfil e se funciona corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<DrinkExplore
      title="Explorar Bebidas"
      visible={ false }
    />);

    const btnProfile = getByTestId('profile-top-btn');
    userEvent.click(btnProfile);
    const { pathname } = history.location;
    expect(btnProfile).toBeInTheDocument();
    expect(pathname).toBe('/perfil');
  });
});

describe(`2 - Implemente os elementos da tela de explorar bebidas ou comidas respeitando 
  os atributos descritos no protótipo`, () => {
  test('Tem os data-testids corretos para a tela de explorar comidas', async () => {
    const { findByTestId } = renderWithRouter(<DrinkExplore
      title="Explorar Bebidas"
      visible={ false }
    />);

    expect(await findByTestId(EXPLORE_BY_INGREDIENT)).toBeInTheDocument();
    expect(await findByTestId(EXPLORE_BY_AREA)).toBeInTheDocument();
    expect(await findByTestId('explore-surprise')).toBeInTheDocument();

    expect(await findByTestId(EXPLORE_BY_INGREDIENT))
      .toHaveTextContent('Por Ingredientes');
    expect(await findByTestId(EXPLORE_BY_AREA))
      .toHaveTextContent('Por Local de Origem');
    expect(await findByTestId('explore-surprise')).toHaveTextContent('Me Surpreenda!');
  });
});

describe(`3 - Redirecione a pessoa usuária ao clicar em "Por Ingredientes", a rota 
deve mudar para a tela de explorar por ingredientes`, () => {
  test(`Ao clicar no botão "Por Ingredientes" da tela de explorar bebidas a rota
    muda para a página de explorar bebidas por ingrediente`, async () => {
    const { findByTestId, history } = renderWithRouter(<DrinkExplore
      title="Explorar Bebidas"
      visible={ false }
    />);

    const exploreByIngredientButton = await findByTestId(EXPLORE_BY_INGREDIENT);

    fireEvent.click(exploreByIngredientButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');
  });
});

describe(`4 - Redirecione a pessoa usuária ao clicar em "Por Local de Origem", 
a rota deve mudar para tela de explorar por local de origem`, () => {
  test('A rota deve mudar para tela de explorar por local de origem', async () => {
    const { findByTestId, history } = renderWithRouter(<DrinkExplore
      title="Explorar Bebidas"
      visible={ false }
    />);

    const exploreByAreaButton = await findByTestId(EXPLORE_BY_AREA);

    fireEvent.click(exploreByAreaButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/area');
  });
});
