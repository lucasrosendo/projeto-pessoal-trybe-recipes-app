import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Foods from '../pages/Foods';

describe('1 - Verifica os elementos presentes no Header', () => {
  test('Verifica se o título está presente e contém o texto "Comidas"', () => {
    const { getByTestId } = renderWithRouter(<Foods title="Comidas" />);
    const pageTitle = getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Comidas');
  });

  test('Verifica de exite o botão perfil e se funciona corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<Foods title="Comidas" />);
    const btnProfile = getByTestId('profile-top-btn');
    userEvent.click(btnProfile);
    const { pathname } = history.location;
    expect(btnProfile).toBeInTheDocument();
    expect(pathname).toBe('/perfil');
  });
});
