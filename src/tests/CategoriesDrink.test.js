import React from 'react';
import userEvent from '@testing-library/user-event';
import CategoriesDrink from '../components/CategoriesDrink';
import renderWithRouter from './renderWithRouter';

const reFilter = /category-filter$/;

describe('Requirement 27: render categories filter buttons', () => {
  it('Has the first 5 food/drink categories filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(<CategoriesDrink />);
    const filterButtons = 6;

    expect(getAllByTestId(reFilter).length).toBe(filterButtons);
  });
});

describe('Requirement 28: render categories filter buttons', () => {
  it('Has the first 5 food/drink categories filter buttons', () => {
    const { getByTestId } = renderWithRouter(<CategoriesDrink />);

    const beefFilter = getByTestId('Beef-category-filter');
    const breakfastFilter = getByTestId('Breakfast-category-filter');
    const chickenFilter = getByTestId('Chicken-category-filter');
    const dessertFilter = getByTestId('Dessert-category-filter');
    const goatFilter = getByTestId('Goat-category-filter');

    userEvent.click(beefFilter);

    userEvent.click(breakfastFilter);

    userEvent.click(chickenFilter);

    userEvent.click(dessertFilter);

    userEvent.click(goatFilter);
  });
});
