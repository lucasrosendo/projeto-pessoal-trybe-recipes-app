import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/NotFound';

describe('1 - Verifica os testes da página de NotFound', () => {
  test('Verifica se os elementos estão presentes na tela', () => {
    const { getByTestId } = renderWithRouter(<NotFound />);

    const msgNotFound = getByTestId('msg-notfound');
    expect(msgNotFound).toBeInTheDocument();
  });
});
