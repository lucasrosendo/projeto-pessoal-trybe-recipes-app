import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';
const OK_EMAIL = 'email@grupo5.com';
const OK_PASSWORD = '1234567';

describe('1 - Verifica os testes da página de Login', () => {
  test('Verifica se está na rota correta"', () => {
    const { history } = renderWithRouter(<Login />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Verifica se os elementos estão presentes na tela', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const emailInput = getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('placeholder', 'Email...');
    const passInput = getByTestId(PASSWORD_INPUT);
    expect(passInput).toBeInTheDocument();
    expect(passInput).toHaveAttribute('placeholder', 'Password...');
    const submitInput = getByTestId(LOGIN_SUBMIT_BTN);
    expect(submitInput).toBeInTheDocument();
    expect(submitInput).toHaveTextContent('Entrar');
  });

  test('Verifica se as funcionalidades estão presentes', () => {
    const { getByTestId, history } = renderWithRouter(<Login />);

    const { pathname } = history.location;
    const submitInput = getByTestId(LOGIN_SUBMIT_BTN);
    expect(submitInput.disabled).toBe(true);
    if (submitInput.disabled === false) {
      userEvent.click(submitInput);
      expect(pathname).toBe('/comidas');
    }
  });

  test('Verifica a validação do campo de senha e email', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const submitInput = getByTestId(LOGIN_SUBMIT_BTN);
    expect(submitInput.disabled).toBe(true);
    const passInput = getByTestId(PASSWORD_INPUT);
    userEvent.type(passInput, '12345678');
    const emailInput = getByTestId(EMAIL_INPUT);
    userEvent.type(emailInput, OK_EMAIL);
    expect(submitInput.disabled).toBe(false);
  });

  test('Verifica se existe algum localStorage', () => {
    renderWithRouter(<Login />);

    const userStorage = JSON.parse(localStorage.getItem('user'));
    expect(userStorage).toBe(null);
    const cocktailStorage = JSON.parse(localStorage.getItem('cocktailsToken'));
    expect(cocktailStorage).toBe(null);
    const mealsStorage = JSON.parse(localStorage.getItem('mealsToken'));
    expect(mealsStorage).toBe(null);
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipesStorage).toBe(null);
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(doneRecipesStorage).toBe(null);
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(inProgressStorage).toBe(null);
  });
});

describe(`2 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever sua
  senha no input de senha`, () => {
  it('É possível escrever a senha', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    fireEvent.change(getByTestId(PASSWORD_INPUT), { target: { value: OK_PASSWORD } });

    expect(getByTestId(PASSWORD_INPUT)).toHaveValue(OK_PASSWORD);
  });
});

describe(`3 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever seu
  email no input de email`, () => {
  it('É possível escrever a senha', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    fireEvent.change(getByTestId(EMAIL_INPUT), { target: { value: OK_EMAIL } });

    expect(getByTestId(EMAIL_INPUT)).toHaveValue(OK_EMAIL);
  });
});

describe(`4 - Salve o e-mail da pessoa usuária no localStorage na chave user após
  a submissão`, () => {
  it('Após a submissão a chave user deve estar salva em localStorage', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    fireEvent.change(getByTestId(EMAIL_INPUT), { target: { value: OK_EMAIL } });

    fireEvent.change(getByTestId(PASSWORD_INPUT), { target: { value: OK_PASSWORD } });

    fireEvent.click(getByTestId(LOGIN_SUBMIT_BTN));

    const userStorage = JSON.parse(localStorage.getItem('user'));

    expect(userStorage).toEqual({ email: OK_EMAIL });
  });
});
