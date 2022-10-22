import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent'; // IMPORT FOR MENUCOMPONENT
import './App.css';
import { DISHES } from './shared/dishes'; // IMPORT FOR THE DISHES JSON
import { Component } from 'react';

class App extends Component{

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES
    };
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            AHAHAHA
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">
              That Restaurant Again!
            </NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes}/>
      </div>
    );
  }
}

export default App;
