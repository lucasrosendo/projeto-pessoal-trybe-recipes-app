// Pega no localStorage a chave 'favoriteRecipes' que contem as comidas favoritas, ou seja, já existe essa chave criada
const setComidaFavorita = (recipeObject) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  // Guarda todas as chaves encontradas do recipeObject passado como parametro, na variável allKeys
  const allKeys = Object.keys(recipeObject);

  // Guarda todas as chaves encontradas do recipeObject passado como parametro, na variável objeto. Guarda chaves id, type=comida, area, category, alcoholic, name e image
  const objeto = {
    id: recipeObject.idMeal,
    type: 'comida',
    area: allKeys.some(
      (elem) => elem === 'strArea',
    ) ? recipeObject.strArea : '',
    category: allKeys.some(
      (elem) => elem === 'strCategory',
    ) ? recipeObject.strCategory : '',
    alcoholicOrNot: allKeys.some(
      (elem) => elem === 'strAlcoholic',
    ) ? recipeObject.strAlcoholic : '',
    name: recipeObject.strMeal,
    image: recipeObject.strMealThumb,
  };

  // Salvando as receitas favoritas no `localStorage` na chave `favoriteRecipes`, conforme o que já tinha(usando spread), e a nova informação
  const updateFav = [
    ...favoriteRecipes,
    objeto,
  ];

  localStorage.setItem('favoriteRecipes', JSON.stringify(updateFav));
};

// Salva no localStorage a Bebida Favorita quando não existem favoritos no localStorage ainda
const setComidaFavoritaElse = (recipeObject) => {
  // Guarda todas as chaves encontradas do recipeObject passado como parametro, na variável allKeys
  const allKeys = Object.keys(recipeObject);

  // Guarda todas as chaves encontradas do recipeObject passado como parametro, na variável objeto. Guarda chaves id, type=comida, area, category, alcoholic, name e image
  const objeto = {
    id: recipeObject.idMeal,
    type: 'comida',
    area: allKeys.some(
      (elem) => elem === 'strArea',
    ) ? recipeObject.strArea : '',
    category: allKeys.some(
      (elem) => elem === 'strCategory',
    ) ? recipeObject.strCategory : '',
    alcoholicOrNot: allKeys.some(
      (elem) => elem === 'strAlcoholic',
    ) ? recipeObject.strAlcoholic : '',
    name: recipeObject.strMeal,
    image: recipeObject.strMealThumb,
  };

  // Salvando as receitas favoritas no `localStorage` na chave `favoriteRecipes`, conforme o que já tinha(usando spread), e a nova informação
  const updateFav = [
    objeto,
  ];

  localStorage.setItem('favoriteRecipes', JSON.stringify(updateFav));
};

// Pega no localStorage a chave 'favoriteRecipes' que contem as bebidas favoritas, ou seja, já existe essa chave criada
const setBebidaFavorita = (recipeObject) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  // Guarda todas as chaves encontradas do recipeObject passado como parametro, na variável allKeys
  const allKeys = Object.keys(recipeObject);

  // Guarda todas as chaves encontradas do recipeObject passado como parametro, na variável objeto. Guarda chaves id, type=bebida, area, category, alcoholic, name e image
  const objeto = {
    id: recipeObject.idDrink,
    type: 'bebida',
    area: allKeys.some(
      (elem) => elem === 'strArea',
    ) ? recipeObject.strArea : '',
    category: allKeys.some(
      (elem) => elem === 'strCategory',
    ) ? recipeObject.strCategory : '',
    alcoholicOrNot: allKeys.some(
      (elem) => elem === 'strAlcoholic',
    ) ? recipeObject.strAlcoholic : '',
    name: recipeObject.strDrink,
    image: recipeObject.strDrinkThumb,
  };

  // Salvando as receitas favoritas no `localStorage` na chave `favoriteRecipes`, conforme o que já tinha(usando spread), e a nova informação
  const updateFav = [
    ...favoriteRecipes,
    objeto,
  ];

  localStorage.setItem('favoriteRecipes', JSON.stringify(updateFav));
};

// Salva no localStorage a Bebida Favorita quando não existem favoritos no localStorage ainda
const setBebidaFavoritaElse = (recipeObject) => {
  // Guarda todas as chaves encontradas do recipeObject passado como parametro, na variável allKeys
  const allKeys = Object.keys(recipeObject);

  // Guarda todas as chaves encontradas do recipeObject passado como parametro, na variável objeto. Guarda chaves id, type=bebida, area, category, alcoholic, name e image
  const objeto = {
    id: recipeObject.idDrink,
    type: 'bebida',
    area: allKeys.some(
      (elem) => elem === 'strArea',
    ) ? recipeObject.strArea : '',
    category: allKeys.some(
      (elem) => elem === 'strCategory',
    ) ? recipeObject.strCategory : '',
    alcoholicOrNot: allKeys.some(
      (elem) => elem === 'strAlcoholic',
    ) ? recipeObject.strAlcoholic : '',
    name: recipeObject.strDrink,
    image: recipeObject.strDrinkThumb,
  };

  // Salvando as receitas favoritas no `localStorage` na chave `favoriteRecipes`, conforme nova informação
  const updateFav = [
    objeto,
  ];

  localStorage.setItem('favoriteRecipes', JSON.stringify(updateFav));
};

// Resumindo, busca a chave 'favoriteRecipes' cujo ID é o passado como parametro
const isfavoriteRecipe = (idRecipe, callback) => {
  // Se encontrar no localStorage uma chave 'favoriteRecipes'
  if (localStorage.getItem('favoriteRecipes') !== null) {
    // Guarda em favoriteRecipes informação value que está na chave favoriteRecipes dentro do localStore. Detalhe, vai fazer tudo que está nesta chave
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    // Como guardou tudo dentro da variável favoriteRecipes, faz um SOME para trazer algum cujo ID seja igual ao passado ao parametro
    callback(favoriteRecipes.some((elem) => elem.id === idRecipe));
  }
};

const setFavorites = (recipeObject, url, id, callback) => {
  // Se não foi encontrado no localStorage a chave 'favoriteRecipes', então...
  if (localStorage.getItem('favoriteRecipes') !== null) {
    if (url.includes('comidas')) {
      setComidaFavorita(recipeObject);
    }
    if (url.includes('bebida')) {
      setBebidaFavorita(recipeObject);
    }
  // Se for encontrado no localStorage a chave 'favoriteRecipes', então...
  } else {
    if (url.includes('comidas')) {
      setComidaFavoritaElse(recipeObject);
    }
    if (url.includes('bebidas')) {
      setBebidaFavoritaElse(recipeObject);
    }
  }
  isfavoriteRecipe(id, callback);
};

export { isfavoriteRecipe };
export default setFavorites;
