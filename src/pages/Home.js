import React from 'react';
import { Link } from 'react-router-dom';
import { getCartShops, getProductsFromCategoryAndQuery } from '../services/api';
import CardProduct from '../components/CardProduct';
import ListaCategorias from '../components/ListaCategorias';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      productSearch: '',
      categorySearch: '',
      shoppingCartProducts: 0,
    };

    this.getCartItensFromStorage = this.getCartItensFromStorage.bind(this);
  }

  componentDidMount() {
    this.getCartItensFromStorage();
  }

  getCartItensFromStorage() {
    const getCartItens = getCartShops();
    const getCartItensQnty = getCartItens
      .reduce((acc, item) => {
        acc += item.Quantidade;
        return acc;
      }, 0);

    this.setState({
      shoppingCartProducts: getCartItensQnty,
    });
  }

  onInputChange = ({ target: { value } }) => {
    this.setState({
      productSearch: value,
    });
  }

  onInputChangecategory = async ({ target: { value } }) => {
    const { productSearch } = this.state;
    const products = await getProductsFromCategoryAndQuery(value, productSearch);
    this.setState({
      categorySearch: value,
      productList: products.results,
    });
  }

  handleClick = async () => {
    const { productSearch, categorySearch } = this.state;
    const products = await getProductsFromCategoryAndQuery(categorySearch, productSearch);
    this.setState({
      productList: products.results,
    });
  }

  render() {
    const {
      productList,
      productSearch,
      shoppingCartProducts,
    } = this.state;
    return (
      <>
        <div>
          <input
            type="text"
            data-testid="query-input"
            onChange={ this.onInputChange }
            value={ productSearch }
          />
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </div>
        <div>
          <Link
            data-testid="shopping-cart-button"
            to="/Cart"
          >
            Carrinho de compras
            <span data-testid="shopping-cart-size">{ shoppingCartProducts }</span>
          </Link>
          <ListaCategorias onInputChange={ this.onInputChangecategory } />
        </div>
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>
        {productList.length <= 0
          ? <p>Nenhum produto foi encontrado</p> : (
            productList.map((product) => (
              <CardProduct
                key={ product.id }
                title={ product.title }
                price={ product.price }
                image={ product.thumbnail }
                cartId={ product.id }
                productList={ productList }
                product={ product }
                getCartItensFromStorage={ this.getCartItensFromStorage }
              />
            )))}
      </>
    );
  }
}

export default Home;
