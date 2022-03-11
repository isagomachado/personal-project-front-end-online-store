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

export async function getProductsById(productId) {
  try {
    const request = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
}
