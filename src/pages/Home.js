import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CardProduct from '../components/CardProduct';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: [],
      productSearch: '',
    };
  }

  onInputChange = ({ target: { value } }) => {
    this.setState({
      productSearch: value,
    });
  }

  handleClick = async () => {
    const { productSearch } = this.state;
    const products = await getProductsFromCategoryAndQuery('', productSearch);
    this.setState({
      productList: products.results,
    });
  }

  render() {
    const {
      productList,
      productSearch,
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
              />
            )))}
      </>
    );
  }
}

export default Home;
