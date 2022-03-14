import React from 'react';
import PropTypes from 'prop-types';
import { saveCartShops } from '../services/api';

export default class CardProduct extends React.Component {
  buttonClick = ({ target }) => {
    const { productList } = this.props;
    const cardProduct = productList.find((product) => product.id === target.id);
    saveCartShops(cardProduct);
  }

  render() {
    const {
      title,
      price,
      image,
      cartId,
    } = this.props;

    return (
      <div data-testid="product">
        <div>
          <img src={ image } alt={ title } />
          <p>{title}</p>
          <p>{price}</p>
        </div>
        <div>
          <button
            data-testid="product-add-to-cart"
            type="button"
            onClick={ this.buttonClick }
            id={ cartId }
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    );
  }
}

CardProduct.propTypes = {
  productList: PropTypes.shape([{
    title: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    cartId: PropTypes.string,
  }]),
  title: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  cartId: PropTypes.string,
}.isRequired;
