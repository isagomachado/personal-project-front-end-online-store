import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsById, saveCartShops, getCartShops } from '../services/api';
import '../components/StarRating.css';
import './Details.css';
// import StarRating from '../components/StarRating';

const numberForDefaultArray = 5;

if (!JSON.parse(localStorage.getItem('reviews'))) {
  localStorage.setItem('reviews', JSON.stringify([]));
}

class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      myItem: '',
      myId: '',
      email: '',
      review: '',
      defaultArray: [...Array(numberForDefaultArray)],
      currRating: undefined,
      allReviews: '',
      isDisabled: true,
      shoppingCartProducts: 0,
      freeShipping: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.getCartItensFromStorage = this.getCartItensFromStorage.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getProductsById(id).then((product) => this.setState({
      myItem: product,
      myId: product.id,
      freeShipping: product.shipping.free_shipping,
    }));

    const getLocal = JSON.parse(localStorage.getItem('reviews'));
    const filterGetLocal = getLocal.filter((reviews) => reviews.myId === id);

    this.setState({
      allReviews: filterGetLocal,
    });
    this.getCartItensFromStorage();
  }

  handleInput({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleClick(givenRate) {
    this.setState({
      currRating: givenRate,
      isDisabled: false,
    });
  }

  handleSubmitClick() {
    const { email, currRating, review, myId } = this.state;

    const currReview = {
      email,
      currRating,
      review,
      myId,
    };

    this.setState(
      { loading: true },
      () => {
        const getTest = JSON.parse(localStorage.getItem('reviews'));
        localStorage.setItem('reviews', JSON.stringify([...getTest, currReview]));
        const getNewTest = JSON.parse(localStorage.getItem('reviews'));
        const filterGetNewTest = getNewTest.filter((reviews) => reviews.myId === myId);
        this.setState({
          loading: false,
          allReviews: filterGetNewTest,
          email: '',
          currRating: undefined,
          review: '',
        });
      },
    );
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

  buttonClick = () => {
    const { myItem } = this.state;
    const item = myItem;
    item.Quantidade = 1;
    saveCartShops(item);
    this.getCartItensFromStorage();
  }

  render() {
    const { myItem, email, review, defaultArray, currRating, allReviews, loading,
      isDisabled, myId, shoppingCartProducts, freeShipping,
    } = this.state;

    return (
      <div>
        <Link to="/">
          <h3>&#8617;</h3>
        </Link>
        <Link to="/Cart">
          <i
            className="fa fa-shopping-cart"
            data-testid="shopping-cart-button"
          />
          <span data-testid="shopping-cart-size">{ shoppingCartProducts }</span>
        </Link>
        <div>
          <p data-testid="product-detail-name">{ myItem.title }</p>
          { freeShipping
            && <span data-testid="free-shipping">Frete Gr??tis</span> }
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ this.buttonClick }
            id={ myId }
          >
            Adicionar ao carrinho
          </button>
        </div>

        {/* Req 11 */}
        <div>
          <form className="form-section">
            <input
              type="email"
              data-testid="product-detail-email"
              placeholder="Email"
              name="email"
              value={ email }
              onChange={ this.handleInput }
            />
            <div>
              {defaultArray.map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={ index }
                    className={ index <= currRating ? 'mybutton on' : 'mybutton off' }
                    onClick={ () => this.handleClick(index) }
                    data-testid={ `${index}-rating` }
                  >
                    <h3 className="star-rating">&#9733;</h3>
                  </button>
                );
              })}
            </div>
            <textarea
              data-testid="product-detail-evaluation"
              placeholder="Mensagem (opcional)"
              rows="5"
              name="review"
              value={ review }
              onChange={ this.handleInput }
            />
            <br />
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.handleSubmitClick }
              disabled={ isDisabled }
            >
              Avaliar
            </button>
          </form>
        </div>
        { loading
          ? <p>Loading</p>
          : (
            <div className="reviewField">
              {allReviews.length > 0
                ? allReviews.map((reviews, firstIndex) => (
                  <div key={ firstIndex } className="reviewField-main">
                    <div className="reviewField-fromStorage">
                      <p>{ reviews.email }</p>
                      {defaultArray.map((star, index) => {
                        index += 1;
                        return (
                          <div
                            key={ index }
                            className="star-rating"
                          >
                            <h3
                              className={ index <= reviews.currRating
                                ? 'mybutton on' : 'mybutton off' }
                            >
                              &#9733;
                            </h3>
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <p>{ reviews.review }</p>
                    </div>
                  </div>
                ))
                : ''}
            </div>
          )}
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequire;

export default Details;
