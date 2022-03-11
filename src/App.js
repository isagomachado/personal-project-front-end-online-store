import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={ Home } />
      </BrowserRouter>
    </div>
  );
}

export default App;
