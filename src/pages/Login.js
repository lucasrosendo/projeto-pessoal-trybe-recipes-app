// Importação do PropType com desconstrução das funções
import { shape, func } from 'prop-types';
// Importação do hook useState
import React, { useState } from 'react';

// Componente funcional Local, desconstruindo o history para buscar rota para push
function Login({ history }) {
  // Criação do getter e setter do Email, onde 'email' é o state que recebe o email digitado e o setEmail é responsável por alterar esse state, e o state inicial dele é ''.
  const [email, setEmail] = useState('');
  // Criação do getter e setter do Password, onde 'password' é o state que recebe o password digitado e o setPassword é responsável por alterar esse state, e o state inicial dele é ''.
  const [password, setPassword] = useState('');

  // Função para validar o email, cada check de if retornará false e o botão não ficará ativado
  const checkValidity = () => {
    const MIN_PASSWORD_LENGTH = 6;
    if (password.length <= MIN_PASSWORD_LENGTH) return false;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    return true;
  };

  // Função criada, requisito 6, com a finalidade de registrar no localStorage 2 tokens com valores de 1
  const saveToken = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          type="text"
          id="email"
          name="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          data-testid="email-input"
          placeholder="Email"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          id="password"
          name="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          data-testid="password-input"
          placeholder="Password"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !checkValidity() }
        onClick={ saveToken }
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};

export default Login;
