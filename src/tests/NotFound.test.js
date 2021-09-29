import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import NotFound from '../pages/NotFound';

describe('1 - Verifica os testes da página de NotFound', () => {
  test('Verifica se a mensagem de página não econtrada está presente na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    const notFound = screen
      .getByRole('heading', { name: 'A página que você procura não foi encontrada' });
    expect(notFound).toBeInTheDocument();
  });
});
