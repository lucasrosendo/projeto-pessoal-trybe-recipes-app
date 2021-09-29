import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Loading from '../components/Loading';

describe('1 - Verifica os testes do componente Loading', () => {
  test('Verifica se a mensagem de página em Loading está presente na tela', () => {
    renderWithRouter(<Loading />);

    const loading = screen.getByRole('heading', { name: 'Carregando...' });
    expect(loading).toBeInTheDocument();
  });
});
