import React from 'react';
import CategoriesFood from '../components/CategoriesFood';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Verifica o componente CategoriesFood', () => {
  it('Verifica se botão "All" de categorias existe', () => {
    const { getByTestId } = renderWithRouter(<CategoriesFood />);

    const filterAll = getByTestId('All-category-filter');
    expect(filterAll).toBeInTheDocument();
  });
});

describe('Verificações diversas:', () => {
  it('Verifica se há botões de categoria', async () => {
    const { findByTestId } = renderWithRouter(<CategoriesFood />);

    const beefButton = await findByTestId('Beef-category-filter');
    const breakfastButton = await findByTestId('Breakfast-category-filter');
    const chickenButton = await findByTestId('Chicken-category-filter');
    const dessertButton = await findByTestId('Dessert-category-filter');
    const goatButton = await findByTestId('Goat-category-filter');
    expect(beefButton).toHaveTextContent('Beef');
    expect(breakfastButton).toHaveTextContent('Breakfast');
    expect(chickenButton).toHaveTextContent('Chicken');
    expect(dessertButton).toHaveTextContent('Dessert');
    expect(goatButton).toHaveTextContent('Goat');
  });
});
