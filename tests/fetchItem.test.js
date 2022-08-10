require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  test('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  
  test('Teste se fetch foi chamada ao executar fetchItem com param MLB1615760527', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  test('Teste se, ao chamar a função fetchItem com o argumento MLB1615760527, a função fetch utiliza o endpoint https://api.mercadolibre.com/items/MLB1615760527', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  test('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item, que já está importado no arquivo.', async () => {
    const resposta = await fetchItem('MLB1615760527');
    expect(resposta).toEqual(item);
  });
  test('Teste ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const fail = await fetchItem();
    expect(fail).toEqual(new Error('You must provide an url'));
  })
});
