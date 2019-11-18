'use strict';
const listIngredients = document.querySelector('.list__ingredients');
const myBag = [];

const data = {
  "recipe": {
    "name": "Risotto de setas (vegano)",
    "shipping-cost": 7,
    "currency": "€",
    "ingredients": [
      {
        "product": "Margarina de maíz",
        "brand": "Artua",
        "items": 1,
        "quantity": "600 gr.",
        "price": 2.95
      },
      {
        "product": "Arroz de Valencia",
        "brand": "De Nuestra Tierra",
        "items": 1,
        "quantity": "1 kg.",
        "price": 2.40
      },
      {
        "product": "Caldo de verduras natural",
        "brand": "Aneto",
        "items": 1,
        "quantity": "1 l.",
        "price": 3.60
      },
      {
        "product": "Seta Shiitake ecológica",
        "items": 1,
        "quantity": "200 gr.",
        "price": 3.55
      },
      {
        "product": "Paragoce, vino blanco",
        "brand": "Verdejo D.O. Rueda",
        "items": 1,
        "quantity": "0,57 cl.",
        "price": 5.85
      },
      {
        "product": "Ajo",
        "items": 1,
        "quantity": "270 gr.",
        "price": 1.49
      },
      {
        "product": "Cebolla chalotas",
        "items": 1,
        "quantity": "200 gr.",
        "price": 2.99
      }
    ]
  }
}

function createIngredienteElement (ingredient) {
  return `<li class="list-group-item list__item">
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
        <p class="price text-success">${ingredient.price} ${data.recipe.currency}</p>
      </div>
    </li>`
}

function handleChangeCheckbox (event) {
  const checkboxSelected = event.currentTarget;
  console.log('soy el checkbox seleccinado');
  const numberOfIngredientsInput = document.querySelector('.input__item-number');
  console.log(numberOfIngredientsInput.getAttribute('data-item-type'));
  const numberOfIngredientsInputValue = numberOfIngredientsInput.value;
  console.log(numberOfIngredientsInputValue);
}

for (let item of data.recipe.ingredients) {
  const ingredientElement = createIngredienteElement(item);
  listIngredients.innerHTML += ingredientElement;
}

const allCheckbox = document.querySelectorAll('.item__checkbox');
for (let checkbox of allCheckbox) {
  checkbox.addEventListener('change', handleChangeCheckbox);
}

