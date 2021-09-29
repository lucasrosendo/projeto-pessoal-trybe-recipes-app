import userEvent from '@testing-library/user-event';
import React from 'react';
import Drinks from '../pages/Drinks';
import renderWithRouter from './renderWithRouter';

const DRINK_CARDS_COUNT = 12;
const ordinaryButtonId = 'Ordinary Drink-category-filter';
const allButtonId = 'All-category-filter';

describe('Testando tela de Bebidas ', () => {
  test('Testando rotas', async () => {
    const { history, getByTestId } = renderWithRouter(<Drinks />);
    history.push('/bebidas');
    const allButton = await getByTestId(allButtonId);
    userEvent.click(allButton);
    const path = history.location.pathname;

    expect(path).toBe('/bebidas');
  });

  test('Testando quantidade de Cards de Bebidas', async () => {
    const {
      history, findByText, findAllByTestId } = renderWithRouter(<Drinks />);
    history.push('/bebidas');

    const drinkName = await findByText(/B-53/i);
    expect(drinkName).toBeInTheDocument();

    const drinksCards = await findAllByTestId(/recipe-card/i);
    expect(drinksCards.length).toBe(DRINK_CARDS_COUNT);

    drinksCards.forEach((drinkCard) => {
      expect(drinkCard).toBeInTheDocument();
    });
  });

  test('Testando Filtros de Categorias', async () => {
    const { history, findByTestId } = renderWithRouter(<Drinks />);
    history.push('/bebidas');

    const allButton = await findByTestId(allButtonId);
    expect(allButton).toBeInTheDocument(allButtonId);

    const ordinaryButton = await findByTestId(ordinaryButtonId);
    expect(ordinaryButton).toBeInTheDocument(ordinaryButtonId);

    const cocktailButton = await findByTestId('Cocktail-category-filter');
    expect(cocktailButton).toBeInTheDocument('Cocktail-category-filter');

    const milkButton = await findByTestId('Milk / Float / Shake-category-filter');
    expect(milkButton).toBeInTheDocument('Milk / Float / Shake-category-filter');

    const otherButton = await findByTestId('Other/Unknown-category-filter');
    expect(otherButton).toBeInTheDocument('Other/Unknown-category-filter');

    const cocoaButton = await findByTestId('Cocoa-category-filter');
    expect(cocoaButton).toBeInTheDocument('Cocoa-category-filter');
  });

  test('Testando quando clica na Categoria de um botão', async () => {
    const { history, findByTestId, findByText } = renderWithRouter(<Drinks />);
    history.push('/bebidas');

    const ordinaryButton = await findByTestId(ordinaryButtonId);
    userEvent.click(ordinaryButton);
    const text = await findByText('A Day at the Beach');
    expect(text).toBeInTheDocument();
  });
});
