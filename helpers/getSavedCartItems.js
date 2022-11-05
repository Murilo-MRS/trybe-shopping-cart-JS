const getSavedCartItems = () => {
  // seu código aqui
  const cartItemsSaved = localStorage.getItem('cartItems');
  return cartItemsSaved;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
