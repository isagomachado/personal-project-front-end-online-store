import React from 'react';

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
    return (
      <div>
        {
          categorias.map(({ id, name }) => (
            <div key={ id }>
              <label htmlFor={ name } data-testid="category">
                <input type="radio" id={ name } />
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

export default ListaCategorias;
