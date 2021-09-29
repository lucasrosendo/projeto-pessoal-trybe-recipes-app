import React from 'react';
import PropTypes from 'prop-types';

function NotFound({ history }) {
  return (
    <div className="not-found-body">
      <div className="message">
        <h1>404</h1>
        <h3 id="msg-notfound">Not Found</h3>
        <button type="button" onClick={ history.goBack }>voltar</button>
      </div>
    </div>
  );
}

NotFound.propTypes = {
  history: PropTypes.shape(PropTypes.any).isRequired,
};

export default NotFound;
