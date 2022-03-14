import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsById } from '../services/api';

class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      myItem: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getProductsById(id).then(({ title }) => this.setState({
      myItem: title,
    }));
  }

  render() {
    const { myItem } = this.state;

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
