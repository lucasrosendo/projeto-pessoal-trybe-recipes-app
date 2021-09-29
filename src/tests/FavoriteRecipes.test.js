import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from './renderWithRouter';

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
