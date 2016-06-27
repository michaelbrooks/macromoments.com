import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

import FadeImage from '../components/fade_image';
import RouteHelper from '../components/route_helper';
import albums from '../components/albums';
import constants from '../components/constants';

@RouteHelper
@Radium
export default class Album extends React.Component {

  static propTypes = {
    album: PropTypes.string.isRequired,
    linkToImage: PropTypes.func.isRequired,
  };

  render() {
    const imgStyle = {
      width: '100%',
      position: 'relative',
      marginTop: 0,
      marginRight: 0,
      paddingBottom: constants.pageMargin,
      marginLeft: 0,
      display: 'inline-block',

      '@media (min-width: 768px)': {
        width: '33.33%',
        paddingRight: constants.pageMargin,
        boxSizing: 'border-box',
      },

      '@media (min-width: 992px)': {
        width: '25%',
      },
    };

    const middleStyle = {
      width: '100%',
      paddingBottom: '100%',
      position: 'relative',
    };

    const childStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    };

    const {
      album,
      linkToImage,
    } = this.props;

    const titleHeight = 70;
    const titleStyle = {
      color: 'white',
      fontWeight: 200,
      fontSize: 36,
      background: 'rgba(0, 0, 0, 0.7)',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      textAlign: 'center',
      margin: 0,
      height: titleHeight,
      lineHeight: `${titleHeight}px`,
    };

    const images = albums.getImages(album)
      .map((url, idx) => (
        <div style={imgStyle} key={album + idx}>
          <div style={middleStyle}>
          <div style={childStyle}>
            <Link to={linkToImage(album, idx)}>
              <FadeImage src={url}/>
            </Link>
          </div>
          </div>
        </div>
      ));

    const albumStyle = {
      paddingLeft: constants.pageMargin,
      paddingTop: titleHeight,
      paddingBottom: constants.pageMargin,
      paddingRight: constants.pageMargin,
      boxSizing: 'border-box',

      '@media (min-width: 768px)': {
        paddingRight: 0,
      },

      // '@media (min-width: 992px)': {
      //   paddingLeft: 0,
      //   paddingRight: 0,
      //   width: 992 - constants.pageMargin,
      //   marginLeft: 'auto',
      //   marginRight: 'auto',
      //   position: 'relative',
      //   left: constants.pageMargin / 2,
      // },
      //
      // '@media (min-width: 1200px)': {
      //
      // },
    };

    return (
      <div>
        <div style={albumStyle}>
          { images }
        </div>
        <h1 style={titleStyle}>{album}</h1>
      </div>
    );
  }
}
