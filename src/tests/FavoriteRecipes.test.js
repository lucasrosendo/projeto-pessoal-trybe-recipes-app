import React from 'react';
import { screen } from '@testing-library/react';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from './renderWithRouter';

describe('1 - Verifica os elementos presentes na tela Receitas Favoritas', () => {
  test('Verifica se o título está presente e contém o texto "Receitas Favoritas"', () => {
    const { getByTestId } = renderWithRouter(
      <FavoriteRecipes title="Receitas Favoritas" visible={ false } />,
    );

    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Receitas Favoritas');
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
