import React from 'react';

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
      </>
    );
  }
}

export default Home;
