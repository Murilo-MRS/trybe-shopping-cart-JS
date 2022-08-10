const fetchItem = async (ItemID) => {
  const url = `https://api.mercadolibre.com/items/${ItemID}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
// fetchItems para retornar dados de um produto e adicioná-lo ao carrinho.
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
