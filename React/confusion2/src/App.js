import logo from './logo.svg';
import Main from './components/MainComponent';
import './App.css';
import { DISHES } from './shared/dishes'; // IMPORT FOR THE DISHES JSON
import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'; // TO USE ROUTER
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component{

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
