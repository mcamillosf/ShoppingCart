const cart = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const button = document.querySelector('.empty-cart');
const load = document.querySelector('.loading');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = `https://http2.mlstatic.com/D_NQ_NP_${imageSource}-O.webp`;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// desafio 4 feito com ajuda do Matheus Duarte
const savedCart = () => {
  localStorage.setItem('car', cart.innerHTML);
  localStorage.setItem('price', totalPrice.innerHTML);
};

const getCartStored = () => {
  cart.innerHTML = localStorage.getItem('car');
  totalPrice.innerHTML = localStorage.getItem('price');
};
// fim do desafio 4

// Josue me ajudou com esse desafio 6.
  button.addEventListener('click', () => {
    const list = document.querySelectorAll('.cart__item');
    list.forEach((item) => item.parentNode.removeChild(item));
    totalPrice.innerHTML = 0;
    savedCart();
  });

// Resolvido em conjunto com o Matheus Duarte. Deu trabalho.
// desafio 5.
const getTotalPrice = async (value, operator) => {
  try {
  const sectionPrice = totalPrice;
  let actualPrice = Number(totalPrice.innerHTML);
  if (operator === '+') actualPrice += value;
  if (operator === '-') actualPrice -= value;
  sectionPrice.innerHTML = Math.round(actualPrice * 100) / 100;
  savedCart();
  } catch (error) {
    alert(error);
  }
};

// desafio 3.
function cartItemClickListener(event) {
  if (event.target.className === 'cart__item') {
  event.target.remove();
  // codigo do desafio 5.
  const productPrice = event.target.querySelector('span').innerText;
  getTotalPrice(productPrice, '-');
  savedCart();
  }
}
// fim do desafio 3.

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `SKU: ${sku} | NAME: ${name} | PRICE: $<span>${salePrice}</span>`;
  cart.appendChild(li);
  // codigo do desafio 5.
  getTotalPrice(salePrice, '+');
  return li;
}

// desafio 2 feito com ajuda do Matheus Duarte e Rogério Silva
const addItemCartShopp = async (id) => {
  try {
    const promiseId = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const dataId = await promiseId.json();
    createCartItemElement(dataId);
    savedCart();
  } catch (error) {
    alert(error);
  }
};

// contem codigo do desafio 2
function createProductItemElement({ id: sku, title: name, thumbnail_id: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.lastElementChild.addEventListener('click', (event) => {
    addItemCartShopp(event.target.parentElement.firstElementChild.innerText);
  });
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// desafio 1
const addItems = (items) => {
  items.forEach((item) => {
    const itemHTML = createProductItemElement(item);
    const section = document.querySelector('.items');
    section.appendChild(itemHTML);
  });
  load.remove(alert('mensagem apagada'));
};

// refatorado com ajuda do Rogério.
const getProductPromise = async (product = 'computador') => {
  try {
  const promise = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  const data = await promise.json();
  const result = data.results;
  addItems(result);
  } catch (erro) {
  alert(erro);
  }
};
// fim do desafio 1

cart.addEventListener('click', cartItemClickListener);

window.onload = () => {
  getProductPromise();
  getCartStored();
};
