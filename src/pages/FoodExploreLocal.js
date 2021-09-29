import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesList from '../components/RecipesList';
import RecipeContext from '../context/RecipeContext';

function FoodExploreLocal() {
  const [origins, setOrigins] = useState([]);
  const [foodsByOrigin, setFoodsByOrigin] = useState([]);
  const [dropDownValue, setDropDownValue] = useState('');

  const { directRequestFood, mealsOrDrinks } = useContext(RecipeContext);

  const MAX_NUMBER = 12;

  const getAllFoodsOrigin = async () => {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const { meals } = await request.json();
    setOrigins(meals);
  };

  const getFoodsByOrigin = async (value) => {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
    const { meals } = await request.json();
    if (value === 'All') return setFoodsByOrigin(mealsOrDrinks);
    return setFoodsByOrigin(meals);
  };

  useEffect(() => {
    getAllFoodsOrigin();
    directRequestFood();
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setDropDownValue(value);
    getFoodsByOrigin(value);
  };

  return (
    <div>
      <Header title="Explorar Origem" />
      <label
        htmlFor="origins"
      >
        Selecione a Origem:
        <select
          data-testid="explore-by-area-dropdown"
          id="origins"
          onChange={ handleChange }
        >
          <option
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          {
            origins.map((el, i) => (
              <option
                key={ i }
                data-testid={ `${el.strArea}-option` }
                value={ el.strArea }
              >
                {el.strArea}
              </option>
            ))
          }
        </select>
      </label>
      {
        dropDownValue && foodsByOrigin
          .map((el, i) => {
            if (i < MAX_NUMBER) {
              return (
                <Link
                  to={ `/comidas/${el.idMeal}` }
                  key={ i }
                  className="food-card"
                  data-testid={ `${i}-recipe-card` }
                >
                  <span
                    data-testid={ `${i}-card-name` }
                  >
                    { el.strMeal }
                  </span>
                  <img
                    data-testid={ `${i}-card-img` }
                    src={ el.strMealThumb }
                    alt={ el.strMealThumb }
                  />
                </Link>
              );
            }
            return '';
          })
      }
      {!dropDownValue && <RecipesList />}
      <Footer />
    </div>
  );
}

export default FoodExploreLocal;
