if (!JSON.parse(localStorage.getItem('cartProducts'))) {
  localStorage.setItem('cartProducts', JSON.stringify([]));
}

export async function getCategories() {
  try {
    const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
}

export async function getCartShops() {
  const data = await JSON.parse(localStorage.getItem('cartProducts'));
  return data;
}

export async function saveCartShops(cartProduct) {
  const dataSave = await getCartShops();
  if (!dataSave.some((item) => item.id === cartProduct.id)) {
    localStorage.setItem('cartProducts', JSON.stringify([...dataSave, cartProduct]));
  }
}
