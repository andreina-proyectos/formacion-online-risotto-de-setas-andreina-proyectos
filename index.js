'use strict';
import {recipeData} from './recipe-data.js';
const listIngredients = document.querySelector('.list__ingredients');
const myBag = [];
console.log(recipeData);

function createIngredienteElement (ingredient) {
  return `
    <li data-item-type="${ingredient.product}" class="list-group-item list__item">
      <div class="item__input-wrapper" >
        <input data-item-type="${ingredient.product}" class="item__checkbox" type="checkbox" aria-label="Checkbox for following text input">
        <input data-item-type="${ingredient.product}" type="number" class="input__item-number" aria-label="Text input with checkbox">
        <ul class="item__list">
          <li class="item__description">Artículo: ${ingredient.product}</li>
          <li class="item__description">Marca: ${ingredient.branch}</li>
          <li class="item__description">${ingredient.quantity}</li>
        </ul>
      </div>
      <div class="item__price">
        <p data-item-type="${ingredient.product}" class="price text-success">${ingredient.price} ${recipeData.recipe.currency}</p>
      </div>
    </li>`
}

function handleChangeCheckbox (event) {
  const checkboxSelected = event.currentTarget;
  console.log('soy el checkbox seleccinado');
  // checkboxSelected.checked?  : '';
}

for (let item of recipeData.recipe.ingredients) {
  const ingredientElement = createIngredienteElement(item);
  listIngredients.innerHTML += ingredientElement;

}

const allCheckbox = document.querySelectorAll('.item__checkbox');
for (let checkbox of allCheckbox) {
  checkbox.addEventListener('change', handleChangeCheckbox);
}

