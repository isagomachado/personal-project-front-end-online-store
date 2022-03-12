import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsById } from '../services/api';
import StarRating from '../components/StarRating';

class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      myItem: '',
      email: '',
      review: '',
    };

    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getProductsById(id).then(({ title }) => this.setState({
      myItem: title,
    }));
  }

  handleInput({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { myItem, email, review } = this.state;

    return (
      <div>
        <Link to="/">
          <h3>&#8617;</h3>
        </Link>
        <Link to="/Cart">
          <i className="fa fa-shopping-cart" />
        </Link>

        <div>
          <p data-testid="product-detail-name">{ myItem }</p>
        </div>

        {/* Req 11 */}
        <form>
          <input
            type="email"
            data-testid="product-detail-email"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ this.handleInput }
          />

          <StarRating />

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
          >
            Avaliar
          </button>
        </form>
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
};

Details.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: '',
    }),
  }),
};

export default Details;
