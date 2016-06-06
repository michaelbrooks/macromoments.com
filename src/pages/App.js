import React, {Component} from 'react';
import { StyleRoot } from 'radium';

import Nav from '../components/nav';

export default class App extends Component {
  render() {
    return (
      <StyleRoot>
        <div style={{
          background: "#000",
          width: '100%',
          minHeight: '100%',
        }}>
          { this.props.children }
          <div style={{
            color: '#999',
            position: 'fixed',
            right: 5,
            bottom: 5 + Nav.height,
            fontSize: 10,
          }}>
            To purchase an image, please contact me
          </div>
          <Nav/>
        </div>
      </StyleRoot>
    );
  }
}
