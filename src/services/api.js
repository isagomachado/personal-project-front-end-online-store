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

export function getCartShops() {
  const data = JSON.parse(localStorage.getItem('cartProducts'));
  return data;
}

export function saveCartShops(cartProduct) {
  const dataSave = getCartShops();
  if (!dataSave.some((item) => item.id === cartProduct.id)) {
    localStorage.setItem('cartProducts', JSON.stringify([...dataSave, cartProduct]));
  }
}

export async function getProductsById(productId) {
  try {
    const request = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
}

export function removeProduct(id) {
  const products = getCartShops();
  localStorage.setItem('cartProducts', JSON.stringify([]));
  if (products.length > 1) {
    saveCartShops(...products.filter((product) => product.id !== id));
  } else {
    localStorage.setItem('cartProducts', JSON.stringify([]));
  }
}

export function upDateProduct(productList) {
  localStorage.setItem('cartProducts', JSON.stringify(productList));
}
