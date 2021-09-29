import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const favoriteUrl = '/receitas-favoritas';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

beforeEach(() => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
});

afterEach(() => {
  localStorage.clear();
});

describe('1 - Verifica os elementos presentes na tela Receitas Favoritas', () => {
  test('Verifica se o link é "/receitas-favoritas"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(favoriteUrl);
    const { pathname } = history.location;
    expect(pathname).toBe(favoriteUrl);
  });

  test('Verifica se o Header mostra botão profile', () => {
    const { getByTestId } = renderWithRouter(<FavoriteRecipes />);
    const profileBtn = getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
  });

  test('Verifica se é mostrado os filtros', () => {
    const { getByText } = renderWithRouter(<FavoriteRecipes />);
    const allBtn = getByText('All');
    const foodBtn = getByText('Food');
    const drinksBtn = getByText('Drinks');

    expect(allBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });

  test('Verifica se o nome da Receita é mostrado', () => {
    const { getByText } = renderWithRouter(<FavoriteRecipes />);
    const firstRecipeName = getByText('Spicy Arrabiata Penne');
    expect(firstRecipeName).toBeInTheDocument();
    const secondRecipeName = getByText('Aquamarine');
    expect(secondRecipeName).toBeInTheDocument();
  });

  test('Verifica se a imagem da Receita é mostrada', () => {
    const { getByTestId } = renderWithRouter(<FavoriteRecipes />);
    const firstImage = getByTestId('0-horizontal-image');
    expect(firstImage).toBeInTheDocument();
    const secondImage = getByTestId('1-horizontal-image');
    expect(secondImage).toBeInTheDocument();
  });

  test('Verifica se as informações da Receita é mostrada', () => {
    const { getByTestId, getByText } = renderWithRouter(<FavoriteRecipes />);
    const firstInfo = getByTestId('0-horizontal-top-text');
    expect(getByText('Italian - Vegetarian')).toBeInTheDocument();
    expect(firstInfo).toBeInTheDocument();
    const secondInfo = getByTestId('1-horizontal-top-text');
    expect(secondInfo).toBeInTheDocument();
    expect(getByText('Alcoholic')).toBeInTheDocument();
  });

  test('Verifica se o botão de compartilhamento é mostrado', () => {
    const { getByTestId } = renderWithRouter(<FavoriteRecipes />);
    const firstShare = getByTestId('0-horizontal-share-btn');
    expect(firstShare).toBeInTheDocument();
    const secondShare = getByTestId('1-horizontal-share-btn');
    expect(secondShare).toBeInTheDocument();
  });

  test('Verifica se o botão de Favorito é mostrado', () => {
    const { getByTestId } = renderWithRouter(<FavoriteRecipes />);
    const firstFavorite = getByTestId('0-horizontal-favorite-btn');
    expect(firstFavorite).toBeInTheDocument();
    const secondFavorite = getByTestId('1-horizontal-favorite-btn');
    expect(secondFavorite).toBeInTheDocument();
  });

  test('Verifica se o título está presente e contém o texto "Receitas Favoritas"', () => {
    const { getByTestId } = renderWithRouter(
      <FavoriteRecipes title="Receitas Favoritas" visible={ false } />,
    );

    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Receitas Favoritas');
  });

  test('Todos os data-testids estão disponíveis', () => {
    renderWithRouter(<FavoriteRecipes title="Receitas Favoritas" visible={ false } />);

    expect(screen.queryByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('1-horizontal-favorite-btn')).toBeInTheDocument();
  });

  test('Verifica se os botões de filtro estão presentes', () => {
    const { getByTestId } = renderWithRouter(
      <FavoriteRecipes title="Receitas Favoritas" visible={ false } />,
    );
    const btnAll = getByTestId('filter-by-all-btn');
    const btnFood = getByTestId('filter-by-food-btn');
    const btnDrink = getByTestId('filter-by-drink-btn');
    expect(btnAll).toBeInTheDocument();
    expect(btnFood).toBeInTheDocument();
    expect(btnDrink).toBeInTheDocument();
  });

  test('Ao clicar no botão de Food mostra apenas as Foods favoritadas', () => {
    renderWithRouter(<FavoriteRecipes title="Receitas Favoritas" visible={ false } />);
    const filtrarFoods = screen.getByTestId('filter-by-food-btn');
    userEvent.click(filtrarFoods);

    expect(screen.getByText(/Penne/i)).toBeInTheDocument();
  });

  test('Ao clicar no botão de ALL mostra todas as receitas favoritadas', () => {
    renderWithRouter(<FavoriteRecipes title="Receitas Favoritas" visible={ false } />);
    const filtrarAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filtrarAll);

    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
  });
});

describe('2 - Verifica se uma receita favorita é carregada', () => {
  test('Mostra uma receita favorita', async () => {
    const testFavoriteRecipe = [
      {
        alcoholicOrNot: '',
        area: 'Canadian',
        category: 'Dessert',
        id: '52929',
        image:
          'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
        name: 'Timbits',
        type: 'comida',
      },
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(testFavoriteRecipe));

    renderWithRouter(
      <FavoriteRecipes title="Receitas Favoritas" visible={ false } />,
    );

    const recipeName = screen.getByTestId('0-horizontal-name');
    expect(recipeName.innerHTML).toBe('Timbits');
  });
});

describe('3 - Testa se quanto uma imagem ou título de receita é clicado', () => {
  beforeAll(() => localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes)));

  test('Testa quando a imagem de receita é clicada', () => {
    const { getByTestId, history } = renderWithRouter(<FavoriteRecipes />);
    const firstImage = getByTestId('0-horizontal-image');
    userEvent.click(firstImage);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52771');
  });

  test('Verifica quando o título da receita é clicado', () => {
    const { getByText, history } = renderWithRouter(<FavoriteRecipes />);
    const secondRecipeName = getByText('Aquamarine');
    userEvent.click(secondRecipeName);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas/178319');
  });
});
