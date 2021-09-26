import React from 'react';

function ButtonBegun({ datatestid, id, objDetail }) {
  const history = useHistory();
  const iniciarReceita = 'Iniciar Receita';

  const [buttonName, setButtonName] = useState(iniciarReceita);



  




  // Verifica no localStorage se o botão foi iniciado para algum id em específico
  const verifyId = () => {
    let newArray = [];
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
      if ()
    }
  }











  // Seta o Nome do Botão conforme busca no localStorage
  // Se o elemento id tiver no localstorage então "Continuar Receita"
  // Senão, Inicia Receita nova
  useEffect(() => {
    setButtonName(verifyId().some((elem) => elem === id)
      ? 'Continuar Receita' : iniciarReceita);
  });

  return (
    <div>
      <button
        className="start-recipe-btn"
        type="button"
        data-testid={ datatestid }

      >
        { buttonName }
      </button>
    </div>
  );
}

export default ButtonBegun;
