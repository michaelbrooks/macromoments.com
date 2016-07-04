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
      background: 'rgba(0, 0, 0, 0.7)',
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

    const links = [
      <IndexLink to="/" style={linkStyle} activeStyle={activeStyle}>Home</IndexLink>,
      <Link to="/tea" style={linkStyle} activeStyle={activeStyle}>Tea</Link>,
      <Link to="/nature" style={linkStyle} activeStyle={activeStyle}>Nature</Link>,
      <Link to="/other" style={linkStyle} activeStyle={activeStyle}>Other</Link>,
      <Link to="/animals" style={linkStyle} activeStyle={activeStyle}>Animals</Link>,
      /* <Link to="/about" style={linkStyle} activeStyle={activeStyle}>About</Link>, */
    ];

    return (
      <div style={navbarStyle}>
        <div style={{
          color: '#999',
          fontSize: 10,
          marginRight: constants.pageMargin,
          float: 'right',
        }}>
          To purchase an image, please contact me
        </div>
        <ul role="nav" style={ulStyle}>
          {
            links.map((link, idx) => (
              <li key={idx} style={liStyle}>{link}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}
