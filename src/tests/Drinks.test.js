import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Drinks from '../pages/Drinks';

describe('1 - Verifica o funcionamento da tela de bebidas', () => {
  test('Verifica se o título está presente e contém o texto "Bebidas"', () => {
    const { getByTestId } = renderWithRouter(<Drinks title="Bebidas" />);
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Bebidas');
  });
});

describe('2 - Verifica as funcionalidades da tela de receitas de bebidas', () => {
  test('Caso uma bebida seja encontrada, deve-se ir para rota de detalhes', async () => {
    const { history } = renderWithRouter(<Drinks title="Bebidas" />);
    const searchBtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByTestId('name-search-radio');
    const btnExecSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'A1');
    userEvent.click(nameRadio);
    userEvent.click(btnExecSearch);

    await screen.findByText('A1');

    expect(history.location.pathname).toBe('/bebidas/17222');
  });
});
