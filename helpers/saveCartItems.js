const saveCartItems = (e) => {
  // seu código aqui
  localStorage.setItem('cartItems', e);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
