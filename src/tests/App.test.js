import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Componente App', () => {
  test('O componente App renderiza com sucesso', () => {
    renderWithRouter(<App />);
  });
});
