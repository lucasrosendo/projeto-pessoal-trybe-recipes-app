import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

describe('Página de Login', () => {
  test('Existe um elemento de entrada de e-mail', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });

  test('Existe um elemento de entrada de senha', () => {
    renderWithRouter(<Login />);

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  test('Há um elemento login submit btn', () => {
    renderWithRouter(<Login />);

    const loginSubmitBtn = screen.getByTestId('login-submit-btn');
    expect(loginSubmitBtn).toBeInTheDocument();
  });
});
