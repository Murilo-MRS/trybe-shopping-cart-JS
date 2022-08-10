const getSavedCartItems = (e) => {
  // seu código aqui
  localStorage.getItem('cartItems', e);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
