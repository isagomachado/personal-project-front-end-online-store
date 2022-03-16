import React from 'react';
import { Link } from 'react-router-dom';
import { getCartShops, removeProduct, upDateProduct } from '../services/api';

class Cart extends React.Component {
  constructor() {
    super();

    this.removeProduto = this.removeProduto.bind(this);
    this.adicionaProduto = this.adicionaProduto.bind(this);
    this.subtraiProduto = this.subtraiProduto.bind(this);

    this.state = {
      cartProducts: [],
    };
  }

  componentDidMount() {
    const item = getCartShops();
    this.setState({
      cartProducts: item,
    });
  }

  adicionaProduto({ target }) {
    const { cartProducts } = this.state;
    const products = cartProducts;
    products.forEach((product) => {
      if (product.id === target.parentElement.id) {
        product.Quantidade += 1;
      }
    });
    upDateProduct(products);
    const item = getCartShops();
    this.setState({
      cartProducts: item,
    });
  }

  subtraiProduto({ target }) {
    const { cartProducts } = this.state;
    const products = cartProducts;
    products.forEach((product) => {
      if (product.id === target.parentElement.id && product.Quantidade > 0) {
        product.Quantidade -= 1;
      }
    });
    upDateProduct(products);
    const item = getCartShops();
    this.setState({
      cartProducts: item,
    });
  }

  removeProduto({ target }) {
    removeProduct(target.parentElement.id);
    const item = getCartShops();
    this.setState({
      cartProducts: item,
    });
  }

  render() {
    const { cartProducts } = this.state;

    return (
      <div>
        { cartProducts.length > 0
          ? cartProducts.map((item) => (
            <div key={ item.id } id={ item.id }>
              <button
                type="button"
                onClick={ this.removeProduto }
              >
                X
              </button>
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ this.subtraiProduto }
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">{item.Quantidade}</p>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ this.adicionaProduto }
              >
                +
              </button>
              <p>
                {
                  (item.price) * item.Quantidade
                }
              </p>
            </div>))
          : (<h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>)}
        <Link
          data-testid="checkout-products"
          to="/Checkout"
        >
          <button type="button">Finalizar</button>
        </Link>
      </div>
    );
  }
}

export default Cart;
