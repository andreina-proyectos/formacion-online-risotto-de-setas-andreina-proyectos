'use strict';
import {recipeData} from './recipe-data.js';
const listIngredients = document.querySelector('.list__ingredients');
let listIngredientsArray = [];
let myBag = [];
console.log(recipeData);

function createIngredienteElement (ingredient, index) {
  return `
    <li id="${index}" class="list-group-item list__item">
      <div class="item__input-wrapper" >
        <input data-item-type="${index}" class="item__checkbox" type="checkbox" aria-label="Checkbox for following text input">
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
  const checkboxIndex = checkboxSelected.getAttribute('data-item-type');

  if (checkboxSelected.checked) {
    console.log('estoy checkeado');
    const amountInput = checkboxSelected.nextElementSibling;
    listIngredientsArray[checkboxIndex].amount = amountInput.value;
  }
  else {
    listIngredientsArray[checkboxIndex].amount = 0;
  }

  console.log(listIngredientsArray);
}

recipeData.recipe.ingredients.forEach((ingredient, index) => {
  const ingredientElement = createIngredienteElement(ingredient, index);
  listIngredients.innerHTML += ingredientElement;
  listIngredientsArray.push(
    {
      name: ingredient.product,
      amount: 0, 
      price: ingredient.price,
    }
  )
})

console.log(listIngredientsArray);


const allCheckbox = document.querySelectorAll('.item__checkbox');
for (let checkbox of allCheckbox) {
  checkbox.addEventListener('change', handleChangeCheckbox);
}

