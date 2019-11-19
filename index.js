'use strict';
import {recipeData} from './recipe-data.js';
const listIngredients = document.querySelector('.list__ingredients');
let listIngredientsArray = [];
const shippingCost = recipeData.recipe['shipping-cost'];
const amountTotalPrice = document.querySelector('.total-price');
const buttonTextTotalPrice = document.querySelector('.btn__total-price');
const formTotal = document.querySelector('.form-control-total');
const dishTitle = document.querySelector('.card__dish-title');
dishTitle.innerHTML = recipeData.recipe.name;
const selectAllItems = document.querySelector('.card__select-all');
const unSelectAllItems = document.querySelector('.card__unselect-all');
const numberOfItems = document.querySelector('.list__items-amount');

function createIngredienteElement (ingredient, index) {
  return `
    <li id="${index}" class="list-group-item list__item">
      <div class="item__input-wrapper" >
        <input data-item-type="${index}" class="item__checkbox" type="checkbox" aria-label="Checkbox for following text input">
        <input data-item-type="${ingredient.product}" type="number" class="input__item-number" aria-label="Text input with checkbox">
        <ul class="item__list">
          <li class="item__description">Artículo: ${ingredient.product}</li>
          <li class="item__description">Marca: ${ingredient.brand? ingredient.brand : 'Desconocida'}</li>
          <li class="item__description">${ingredient.quantity}</li>
        </ul>
      </div>
      <div class="item__price">
        <p data-item-type="${ingredient.product}" class="price text-success">${ingredient.price} ${recipeData.recipe.currency}</p>
      </div>
    </li>`
}

function handleSelectAllItems () {
  const allCheckbox = document.querySelectorAll('.item__checkbox');
  for(let i=0; i < allCheckbox.length; i++) {
    allCheckbox[i].checked = true;
    var event = new Event('change');
    allCheckbox[i].dispatchEvent(event);
  }
}

function handleUnSelectAllItems () {
  const allCheckbox = document.querySelectorAll('.item__checkbox');
  for(let i=0; i < allCheckbox.length; i++) {
    allCheckbox[i].checked = false;
    var event = new Event('change');
    allCheckbox[i].dispatchEvent(event);
  }
}

function handleChangeCheckbox (event) {
  const checkboxSelected = event.currentTarget;
  const checkboxIndex = checkboxSelected.getAttribute('data-item-type');
  if (checkboxSelected.checked) {
    const amountInput = checkboxSelected.nextElementSibling;
    if(amountInput.value) {
      listIngredientsArray[checkboxIndex].amount = parseInt(amountInput.value);
    }
    else {
      amountInput.value = 1;
      listIngredientsArray[checkboxIndex].amount = 1;
    }
  }
  else {
    listIngredientsArray[checkboxIndex].amount = 0;
  }
  calculateTotalPrice();
  calculateAllItemsNumber ();
}

function calculateTotalPrice () {
  let totalPrice = listIngredientsArray.reduce((acc, ingredient) => {
    acc += ingredient.price*ingredient.amount;
    return acc;
  } , 0);
  totalPrice = totalPrice + shippingCost;
  formTotal.value = 'TOTAL';
  amountTotalPrice.innerHTML = totalPrice.toFixed(2) + recipeData.recipe.currency;
  buttonTextTotalPrice.innerHTML = totalPrice.toFixed(2) + recipeData.recipe.currency;
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

function calculateAllItemsNumber () {
  const allInput = document.querySelectorAll('.input__item-number');
  let totalItemsAmount = listIngredientsArray.reduce((acc, ingredient) => {
    acc += ingredient.amount;
    return acc;
  } , 0);
  console.log(totalItemsAmount);
  numberOfItems.innerHTML = `Items: ${totalItemsAmount}`;
}

//listeners
selectAllItems.addEventListener('click', handleSelectAllItems);
unSelectAllItems.addEventListener('click', handleUnSelectAllItems);
const allCheckbox = document.querySelectorAll('.item__checkbox');
for (let checkbox of allCheckbox) {
  checkbox.addEventListener('change', handleChangeCheckbox);
}
