import React, { Component } from 'react';
import './Gift.css';

class Gift extends Component {
  constructor(props){
    super(props);
    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.remove(this.props.name);
  }

  render() {
    return (
      <div className="Gift">
        {this.props.name}
        <button className="remove" onClick={this.remove}>X</button>
      </div>
    );
  }
}

export default Gift;
