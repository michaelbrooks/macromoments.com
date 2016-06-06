import React from 'react';
import { Link, IndexLink } from 'react-router'

export default class Nav extends React.Component {
  static height = 60;

  render() {

    const navbarStyle = {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: Nav.height,
      lineHeight: `${Nav.height}px`,
      background: '#333',
      fontSize: 14,
    };

    const ulStyle = {
      padding: 0,
      margin: '0 0 0 10',
    };

    const liStyle = {
      display: 'inline-block',
      marginLeft: 10,
    };

    const linkStyle = {
      color: '#aaa',
      textDecoration: 'none',
      padding: '6px 12px',
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
