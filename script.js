const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const btnEmptyCart = document.querySelector('.empty-cart');

let dataCartItems = [];

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};
// SOMA OS PRECOS DOS ITENS NO CART
const sumPrices = () => {
  const sum = dataCartItems.reduce((acc, curr) => acc + curr.salePrice, 0);
  totalPrice.innerText = `${Math.round(sum * 100) / 100}`;
};

// CAPTURA SKU DO ITEM CLICADO
const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// REMOVE elemento do shop cart ao clica-lo
const cartItemClickListener = (event, sku) => {
  // coloque seu código aqui
    event.target.remove();
    const indexRemove = dataCartItems.findIndex((element) => element.sku === sku);
    dataCartItems.splice(indexRemove, 1);
    saveCartItems(JSON.stringify(dataCartItems));
    sumPrices();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => cartItemClickListener(event, sku));
  return li;
};

const addTocart = async (event) => {
  const skuClick = getSkuFromProductItem(event.target.parentElement);
  const selectedItem = await fetchItem(skuClick);
  const objResult = {
    sku: selectedItem.id,
    name: selectedItem.title,
    salePrice: selectedItem.price,
  };
  dataCartItems.push(objResult);
  const elementCart = createCartItemElement(objResult);
  cartItems.appendChild(elementCart);
  saveCartItems(JSON.stringify(dataCartItems));
  sumPrices();
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));

  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', addTocart);
  section.appendChild(btn);

  return section;
};

// listaDeItems cria lista de item de compras por fetchProducts apenda ao DOM
const listaDeItems = async () => {
  const arrProducts = await fetchProducts('computador');
  const { results } = arrProducts;
  results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const items = document.querySelector('.items');
    const criaElementoCard = createProductItemElement({ sku, name, image });
    items.appendChild(criaElementoCard);
  });
};
// LISTA SALVA DO LOCALSTORAGE E CRIA ELEMENTOS NOVAMENTE NO SHOPPING CART
const cartItemsOnUpdatedWindow = (arr) => {
  arr.forEach((e) => {
    const elementCartSaved = createCartItemElement(e);
    cartItems.appendChild(elementCartSaved);
  });
  sumPrices();
};

const emptyCartItem = () => {
  localStorage.clear();
  dataCartItems = [];
  cartItems.innerHTML = '';
  totalPrice.innerText = '0';
  // saveCartItems(JSON.stringify(dataCartItems));
};
btnEmptyCart.addEventListener('click', emptyCartItem);

window.onload = () => { 
  listaDeItems();
  dataCartItems = JSON.parse(getSavedCartItems()) || [];
  cartItemsOnUpdatedWindow(dataCartItems);
  sumPrices();
  // const vasco = getSavedCartItems() || null;
  // cartItems.innerHTML = JSON.parse(vasco);
};
