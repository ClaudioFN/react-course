import logo from './logo.svg';
import Main from './components/MainComponent';
import './App.css';
import { DISHES } from './shared/dishes'; // IMPORT FOR THE DISHES JSON
import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'; // TO USE ROUTER

class App extends Component{

  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
