import React, { Component } from 'react';
import Gift from './Gift';
import logo from './logo.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gifts: []
    };

    this.addGift = this.addGift.bind(this);
    this.removeGift = this.removeGift.bind(this);
  }

  componentWillMount() {
    fetch('/api')
      .then(response => response.json())
      .then(gifts => {
        this.setState((prevState, props) => ({
          gifts
        }));
      });
  }

  addGift(e) {
    e.preventDefault();
    const { gifts } = this.state;
    const form = e.target;
    const inputs = form.getElementsByTagName('INPUT');
    const name = inputs[0].value;
    inputs[0].value = '';

    fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(gift => {
        this.setState((prevState, props) => ({
          gifts: [...gifts].concat([gift])
        }));
      });

  }

  removeGift(name) {
    const { gifts } = this.state;
    const gift = gifts.find(g => (g.name === name));
    const giftIndex = gifts.indexOf(gift);
    const newGifts = [...gifts];
    newGifts.splice(giftIndex, 1);

    this.setState((prevState, props) => ({
      gifts: newGifts
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">It's Christmas !</h1>
        </header>

        <img src="https://media.giphy.com/media/JltOMwYmi0VrO/giphy.gif" />

        <form onSubmit={this.addGift}>
          <input type="text" />
          <button type="submit"> Ajouter </button>
        </form>

        <div className="GiftWrapper">
          {this.state.gifts.map(gift => (
            <Gift key={gift.id} name={gift.name} remove={this.removeGift} />
          ))}
        </div>

        <button type="button" className="mail"> Dear Santa Florian, send me my gifts</button>

      </div>
    );
  }
}

export default App;
