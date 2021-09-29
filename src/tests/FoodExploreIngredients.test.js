import React from 'react';
import { wait } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FoodExploreIngredients from '../pages/FoodExploreIngredients';

const QTD = 12;

describe(`1 - Verifica elementos da tela de explorar ingredientes respeitando
  os atributos descritos no protótipo`, () => {
  test(`Verifica se tem os data-testids corretos para a tela de explorar
    comidas por ingredientes`, async () => {
    const { findByTestId, queryByTestId } = renderWithRouter(
      <FoodExploreIngredients
        title="Explorar Ingredientes de Comidas"
        visible={ false }
      />,
    );

    for (let index = 0; index < QTD; index += 1) {
      expect(await findByTestId(`${index}-ingredient-card`)).toBeInTheDocument();
      expect(await findByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(await findByTestId(`${index}-card-name`)).toBeInTheDocument();
    }

    await wait(() => expect(queryByTestId('12-ingredient-card')).toBeNull());
    await wait(() => expect(queryByTestId('12-card-img')).toBeNull());
    await wait(() => expect(queryByTestId('12-card-name')).toBeNull());
  });
});
