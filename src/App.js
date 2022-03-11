import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Details from './pages/Details';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/Cart" component={ Cart } />
          <Route path="/Details/:id" component={ Details } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
