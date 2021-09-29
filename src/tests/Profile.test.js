import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Profile from '../pages/Profile';

describe('1 - Verifica os testes da página de Perfil', () => {
  test('Verifica o texto', () => {
    const emailStructure = {
      email: 'mateuscoury@gmail.com',
    };
    localStorage.setItem('user', JSON.stringify(emailStructure));

    const { getByTestId } = renderWithRouter(
      <Profile title="Perfil" visible={ false } />,
    );
    const { email } = JSON.parse(localStorage.getItem('user'));
    const emailTitle = getByTestId('profile-email');
    expect(emailTitle.innerHTML).toBe(email);
  });

  test('Verifica o botao de sair', () => {
    const mealsToken = 1;

    const cocktailsToken = 1;

    const emailStructure = {
      email: 'grupo5@grupo5.com',
    };
    const testDoneRecipe = [
      {
        alcoholicOrNot: '',
        doneDate: '29/03/2021',
        area: 'Canadian',
        category: 'Dessert',
        id: '52929',
        image:
            'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
        name: 'Timbits',
        type: 'comida',
        tags: ['Soup'],
      },
    ];
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

    const testRecipesProgress = {
      cocktails: { 16419: [] },
      meals: { 52997: ['Lentils', 'Carrots'] },
    };

    localStorage.setItem('user', JSON.stringify(emailStructure));
    localStorage.setItem('mealsToken', JSON.stringify(mealsToken));
    localStorage.setItem('cocktailsToken', JSON.stringify(cocktailsToken));
    localStorage.setItem('favoriteRecipes', JSON.stringify(testFavoriteRecipe));
    localStorage.setItem('doneRecipes', JSON.stringify(testDoneRecipe));
    localStorage.setItem('inProgressRecipes', JSON.stringify(testRecipesProgress));

    const { history, getByTestId } = renderWithRouter(
      <Profile title="Perfil" visible={ false } />,
    );

    history.push('/perfil');
    const botaoDeSair = getByTestId('profile-logout-btn');
    userEvent.click(botaoDeSair);
    localStorage.removeItem('user');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('inProgressRecipes');

    expect(localStorage.getItem('user')).toBe(null);
    expect(localStorage.getItem('favoriteRecipes')).toBe(null);
    expect(localStorage.getItem('doneRecipes')).toBe(null);
    expect(localStorage.getItem('cocktailsToken')).toBe(null);
    expect(localStorage.getItem('mealsToken')).toBe(null);
  });
});
