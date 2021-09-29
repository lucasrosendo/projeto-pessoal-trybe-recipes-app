import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Footer from '../components/Footer';

describe('Componente Footer', () => {
  test('Há um elemento de botão de Bebidas', () => {
    renderWithRouter(<Footer />);

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
  });

  test('Há um elemento de botão de Explorar', () => {
    renderWithRouter(<Footer />);

    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    expect(exploreBtn).toBeInTheDocument();
  });

  test('Há um elemento de botão de Comidas', () => {
    renderWithRouter(<Footer />);

    const foodBtn = screen.getByTestId('food-bottom-btn');
    expect(foodBtn).toBeInTheDocument();
  });

  test('Botão de Bebidas redireciona para /bebidas', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    fireEvent.click(drinksBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  test('Botão de Explorar redireciona para /explorar', () => {
    const { history } = renderWithRouter(<Footer />);

    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    fireEvent.click(exploreBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });

  test('Botão de Comidas redireciona para /comidas', () => {
    const { history } = renderWithRouter(<Footer />);

    const foodBtn = screen.getByTestId('food-bottom-btn');
    fireEvent.click(foodBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
