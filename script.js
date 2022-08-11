const cartItems = document.querySelector('.cart__items');
let dataCartItems = [];
// const btnEmptyCart = document.querySelector('.empty-cart');

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
// CAPTURA SKU DO ITEM CLICADO
const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// REMOVE elemento do shop cart ao clica-lo
const cartItemClickListener = (event, sku) => {
  // coloque seu código aqui
    event.target.remove();
    const indexRemove = dataCartItems.findIndex((element) => element.sku === sku);
    dataCartItems.splice(indexRemove, 1);
    saveCartItems(JSON.stringify(dataCartItems));
    console.log(indexRemove);
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
  // const strCaritems = JSON.stringify(cartItems.innerHTML);
  // saveCartItems(strCaritems);
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
  // saveCartItems(JSON.stringify(arrCartSavedList));
};

window.onload = () => { 
  listaDeItems();
  dataCartItems = JSON.parse(getSavedCartItems()) || [];
  cartItemsOnUpdatedWindow(dataCartItems);
  // const vasco = getSavedCartItems() || null;
  // cartItems.innerHTML = JSON.parse(vasco);
};
