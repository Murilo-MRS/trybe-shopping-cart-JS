const cartItems = document.querySelector('.cart__items');

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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
  
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
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

const addTocart = async (event) => {
  const skuClick = getSkuFromProductItem(event.target.parentElement);
  console.log(skuClick);
  const selectedItem = await fetchItem(skuClick);
  const objResult = {
    sku: skuClick,
    name: selectedItem.title,
    salePrice: selectedItem.price,
  };
  const elementCart = createCartItemElement(objResult);
  cartItems.appendChild(elementCart);
};

window.onload = () => { 
  listaDeItems();
};
