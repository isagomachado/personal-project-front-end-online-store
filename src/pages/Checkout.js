import React from 'react';
import PropTypes from 'prop-types';
import { getCartShops, removeProduct } from '../services/api';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    };
  }

  componentDidMount() {
    const products = getCartShops();
    this.setState({
      cartProducts: products,
    });
  }

  excludeProduct = ({ target }) => {
    removeProduct(target.parentElement.id);
    const item = getCartShops();
    this.setState({
      cartProducts: item,
    });
  }

  calculatingTotalValue = () => {
    const { cartProducts } = this.state;
    let totalValue = 0;
    cartProducts.forEach((product) => {
      totalValue += parseFloat(product.Quantidade) * parseFloat(product.price);
    });
    return totalValue;
  }

  inputEvent = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  buttonEvent = () => {
    const { history } = this.props;
    this.setState({
      cartProducts: [],
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    });
    localStorage.setItem('cartProducts', JSON.stringify([]));
    history.push('/');
  }

  render() {
    const { cartProducts, name, email, cpf, phone, cep, address } = this.state;
    return (
      <>
        <div>
          <h2>Revise seus Produtos</h2>
          {cartProducts.map((product) => (
            <div key={ product.id } id={ product.id }>
              <button
                type="button"
                onClick={ this.excludeProduct }
              >
                X
              </button>
              <span>{ product.title }</span>
              <span>{ product.Quantidade }</span>
              <span>{ product.price }</span>
              <span>{ product.price * product.Quantidade }</span>
            </div>
          ))}
          <p>{ this.calculatingTotalValue() }</p>
        </div>
        <form>
          <input
            data-testid="checkout-fullname"
            type="text"
            placeholder="Nome completo"
            name="name"
            value={ name }
            onChange={ this.inputEvent }
          />
          <input
            data-testid="checkout-email"
            type="text"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ this.inputEvent }
          />
          <input
            data-testid="checkout-cpf"
            type="text"
            placeholder="CPF"
            name="cpf"
            value={ cpf }
            onChange={ this.inputEvent }
          />
          <input
            data-testid="checkout-phone"
            type="text"
            placeholder="Telefone"
            name="phone"
            value={ phone }
            onChange={ this.inputEvent }
          />
          <input
            data-testid="checkout-cep"
            type="text"
            placeholder="CEP"
            name="cep"
            value={ cep }
            onChange={ this.inputEvent }
          />
          <input
            data-testid="checkout-address"
            type="text"
            placeholder="Endereço"
            name="address"
            value={ address }
            onChange={ this.inputEvent }
          />
        </form>
        <button type="button" onClick={ this.buttonEvent }>Comprar</button>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Checkout;
