import React from 'react';

import ListaCategorias from '../components/ListaCategorias';

class Home extends React.Component {
  render() {
    return (
      <>
        <div>
          <input type="text" />
        </div>
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>
        <div>
          <ListaCategorias />
        </div>
      </>
    );
  }
}

export default Home;
