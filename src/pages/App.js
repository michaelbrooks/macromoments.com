import React, { Component } from 'react';
import { StyleRoot } from 'radium';

import constants from '../components/constants';
import Nav from '../components/nav';

export default class App extends Component {
  render() {
    return (
      <StyleRoot>
        <div style={{
          width: '100%',
          minHeight: '100%',
          boxSizing: 'border-box',
        }}>
          { this.props.children }
          <Nav/>
        </div>
      </StyleRoot>
    );
  }
}
