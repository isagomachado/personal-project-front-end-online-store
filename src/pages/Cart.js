import React from 'react';
import { getCartShops } from '../services/api';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
      productQuantity: 1,
    };
  }

  componentDidMount() {
    const item = getCartShops();
    this.setState({
      cartProducts: item,
    });
  }

  render() {
    const { cartProducts, productQuantity } = this.state;
    return (
      <div>
        { cartProducts.length > 0
          ? cartProducts.map((item) => (
            <div key={ item.id }>
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <p data-testid="shopping-cart-product-quantity">{productQuantity}</p>
            </div>))
          : (<h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>)}
      </div>
    );
  }
}

export default Cart;
