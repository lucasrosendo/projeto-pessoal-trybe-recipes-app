import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';

describe('Component Header', () => {
  test('Há um elemento botão de Perfil', () => {
    renderWithRouter(<Header title="Comidas" />);

    const profileTopBtn = screen.getByTestId('profile-top-btn');
    expect(profileTopBtn).toBeInTheDocument();
  });

  test('O título é renderizado', () => {
    renderWithRouter(<Header title="Comidas" />);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  test('Há um botão de Search', () => {
    renderWithRouter(<Header title="Comidas" />);

    const searchTopBtn = screen.getByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();
  });
});
