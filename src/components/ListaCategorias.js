import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class ListaCategorias extends React.Component {
  constructor() {
    super();

    this.state = {
      categorias: [],
    };
  }

  async componentDidMount() {
    const responseCategories = await getCategories();

    if (responseCategories) {
      this.setState({
        categorias: responseCategories,
      });
    }
  }

  render() {
    const { categorias } = this.state;
    const { onInputChange } = this.props;
    return (
      <div>
        {
          categorias.map(({ id, name }) => (
            <div key={ id }>
              <label htmlFor={ name } data-testid="category">
                <input
                  type="radio"
                  value={ id }
                  id={ name }
                  name="categorySearch"
                  onChange={ onInputChange }
                />
                {' '}
                { name }
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

ListaCategorias.propTypes = {
  onInputChange: PropTypes.func,
}.isRequired;

export default ListaCategorias;
