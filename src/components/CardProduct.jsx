import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveCartShops } from '../services/api';

export default class CardProduct extends React.Component {
  buttonClick = ({ target }) => {
    const { productList, getCartItensFromStorage } = this.props;
    const cardProduct = productList.find((product) => product.id === target.id);
    cardProduct.Quantidade = 1;
    saveCartShops(cardProduct);
    getCartItensFromStorage();
  }

  render() {
    const {
      title,
      price,
      image,
      cartId,
      product,
    } = this.props;

    return (
      <div data-testid="product">
        <Link
          to={ `/Details/${cartId}` }
          data-testid="product-detail-link"
        >
          <div>
            <img src={ image } alt={ title } />
            { product.shipping.free_shipping
            && <span data-testid="free-shipping">Frete Grátis</span> }
            <p>{title}</p>
            <p>{price}</p>
          </div>
        </Link>
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
