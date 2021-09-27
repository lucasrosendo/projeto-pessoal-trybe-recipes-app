import React, { useContext } from 'react';
import shareIcon from './.../images/shareIcon.svg';

function CardDone({ objDetail, index }) {
  const { setCopied } = useContext(RecipeContext);

  const gettingTags = () => {
    if (objDetail.type === 'comida') {
      return objDetail.tags.map((e, i) => {
        if (i < 2) {
          return (
            <span
              key={ e }
              data-testid={ `${index}-${e}-horizontal-tag` }
            >
              {e}
            </span>
          )
        }
        return '',
      })
    }
    return ''; 
  }

  const render = () => (
    <div>
      <img
        src={ objDetail.image }
        alt={ objDetail.image }
        data-testid={ `${index}-horizontal-image` }
      />
      <h2
        data-testid="${index}-horizontal-top-text"
      />
    </div>
  );

  return render();
}
