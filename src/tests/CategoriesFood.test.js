import React from 'react';
import userEvent from '@testing-library/user-event';
import CategoriesFood from '../components/CategoriesFood';
import renderWithRouter from './renderWithRouter';

const reFilter = /category-filter$/;

describe('Requirement 27: render categories filter buttons', () => {
  it('Has the first 5 food/drink categories filter buttons', () => {
    const { getByTestId } = renderWithRouter(<CategoriesFood />);
    // const filterButtons = 6;

    // expect(getAllByTestId(reFilter).length).toBe(filterButtons);

    const filterAll = getByTestId('All-category-filter');
    expect(filterAll).toBeInTheDocument();

    // const emailInput = getByTestId(EMAIL_INPUT);
    // expect(emailInput).toBeInTheDocument();
  });
});

describe('Requirement 28: render categories filter buttons', () => {
  it('Has the first 5 food/drink categories filter buttons', () => {
    const { getByTestId } = renderWithRouter(<CategoriesFood />);

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
