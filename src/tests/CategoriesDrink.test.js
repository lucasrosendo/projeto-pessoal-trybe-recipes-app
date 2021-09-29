import React from 'react';
import CategoriesDrink from '../components/CategoriesDrink';
import renderWithRouter from './renderWithRouter';

describe('Verifica o componente CategoriesDrink', () => {
  it('Verifica se botão "All" de categorias existe', () => {
    const { getByTestId } = renderWithRouter(<CategoriesDrink />);

    const filterAll = getByTestId('All-category-filter');
    expect(filterAll).toBeInTheDocument();
  });
});

describe('Verificações diversas:', () => {
  test('Verifica se há botões de categoria', async () => {
    const { findByTestId } = renderWithRouter(<CategoriesDrink />);

    const ordinaryButton = await findByTestId('Ordinary Drink-category-filter');
    const cocktailButton = await findByTestId('Cocktail-category-filter');

    const milkFloatShakeButton = await
    findByTestId('Milk / Float / Shake-category-filter');

    const otherUnknowButton = await findByTestId('Other/Unknown-category-filter');
    const cocoaButton = await findByTestId('Cocoa-category-filter');
    expect(ordinaryButton).toHaveTextContent('Ordinary Drink');
    expect(cocktailButton).toHaveTextContent('Cocktail');
    expect(milkFloatShakeButton).toHaveTextContent('Milk / Float / Shake');
    expect(otherUnknowButton).toHaveTextContent('Other/Unknown');
    expect(cocoaButton).toHaveTextContent('Cocoa');
  });
});
