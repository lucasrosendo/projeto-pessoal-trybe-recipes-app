import React from 'react';
import { screen } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from './renderWithRouter';

describe('1 - Verifica os elementos presentes na tela Receitas Feitas', () => {
  test('Verifica se o título está presente e contém o texto "Receitas Feitas"', () => {
    const { getByTestId } = renderWithRouter(
      <DoneRecipes title="Receitas Feitas" visible={ false } />,
    );

    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Receitas Feitas');
  });
});
