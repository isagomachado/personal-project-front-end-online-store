import React from 'react';
import PropTypes from 'prop-types';

export default class CardProduct extends React.Component {
  render() {
    const {
      title,
      price,
      image,
    } = this.props;

    return (
      <div data-testid="product">
        <img src={ image } alt={ title } />
        <p>{title}</p>
        <p>{price}</p>
      </div>
    );
  }
}

CardProduct.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};
