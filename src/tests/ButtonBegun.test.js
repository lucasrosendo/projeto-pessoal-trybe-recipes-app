import React from 'react';
import renderWithRouter from './renderWithRouter';
import ButtonBegun from '../components/ButtonBegun';

describe('1 - Verifica os testes do componente ButtonBegun', () => {
  test('Verifica se os elementos estão presentes na tela', () => {
    const { getByTestId } = renderWithRouter(<ButtonBegun
      id="52977"
    />);

    const btnStartRecipe = getByTestId('start-recipe-btn');
    expect(btnStartRecipe).toBeInTheDocument();
  });
});
