import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <>
        <div>
          <input type="text" />
        </div>
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>
        <div>
          <Link
            data-testid="shopping-cart-button"
            to="/Cart"
          >
            Carrinho de compras
          </Link>
        </div>
      </>
    );
  }
}

export default Home;
