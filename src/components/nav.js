import React from 'react';
import { Link, IndexLink } from 'react-router'

import constants from './constants';

export default class Nav extends React.Component {
  render() {
    const linkLRPadding = 12;

    const navbarStyle = {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: constants.navHeight,
      lineHeight: `${constants.navHeight}px`,
      background: '#333',
      fontSize: 14,
    };

    const ulStyle = {
      padding: 0,
      margin: `0 0 0 ${constants.pageMargin - linkLRPadding}`,
    };

    const liStyle = {
      display: 'inline-block',
      marginRight: 10,
    };

    const linkStyle = {
      color: '#aaa',
      textDecoration: 'none',
      padding: '6px 12px',
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: linkLRPadding,
      paddingRight: linkLRPadding,
    };

    const activeStyle = {
      color: 'white',
    };

    return (
      <div style={navbarStyle}>
        <ul role="nav" style={ulStyle}>
          <li style={liStyle}><IndexLink to="/" style={linkStyle} activeStyle={activeStyle}>Home</IndexLink></li>
          <li style={liStyle}><Link to="/nature" style={linkStyle} activeStyle={activeStyle}>Nature</Link></li>
          <li style={liStyle}><Link to="/abstract" style={linkStyle} activeStyle={activeStyle}>Abstract</Link></li>
          <li style={liStyle}><Link to="/about" style={linkStyle} activeStyle={activeStyle}>About</Link></li>
        </ul>
      </div>
    );
  }
}
