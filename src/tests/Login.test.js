import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

const VALID_EMAIL = 'grupo5@grupo5.com';
const INVALID_EMAIL = 'grupo5@grupo5';
const PASSWORD = '12345678';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';

describe('Página de Login', () => {
  beforeEach(cleanup);

  it('Verifique se o url da página de login está correto', async () => {
    const { history } = renderWithRouter(<Login />);
    const { pathname } = history.location;
    
    expect(pathname).toBe('/');
  });

  it('Verifica se há uma entrada de e-mail do tipo texto', () => {
    renderWithRouter(<Login />);

    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    expect(inputEmail).toBeInTheDocument();
  });

  it('Verifica se há uma entrada de senha do tipo senha', () => {
    renderWithRouter(<Login />);

    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    expect(passwordInput).toBeInTheDocument();
  });

  it('Verifica se tem um botão', () => {
    renderWithRouter(<Login />);

    const buttonLogin = screen.getByTestId(LOGIN_SUBMIT_BTN);
    expect(buttonLogin);
  });

  it(`verifica se quando um usuário digita um e-mail inválido e clica no botão,
  não redirecione a página`,
  () => {
    const { history } = renderWithRouter(<Login />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), INVALID_EMAIL);
    userEvent.type(screen.getByTestId(PASSWORD_INPUT), PASSWORD);
    userEvent.click(screen.getByTestId(LOGIN_SUBMIT_BTN));
    expect(history.location.pathname).toBe('/');
  });
});
