import React from 'react';
import { Link } from 'react-router'
import Radium from 'radium';

import FadeImage from '../components/fade_image';
import albums from '../components/albums';
import constants from '../components/constants';

@Radium
class AlbumIndex extends React.Component {

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
    }

    const middleStyle = {
      width: '100%',
      paddingBottom: '100%',
      position: 'relative',
    }

    const childStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    };

    const album = this.props.params.album;

    let images = albums.getImages(album)
      .map((url, idx) => {
        return (
          <div style={imgStyle} key={album + idx}>
            <div style={middleStyle}>
            <div style={childStyle}>
              <Link to={`/${album}/${idx + 1}`}>
                <FadeImage src={url}/>
              </Link>
            </div>
            </div>
          </div>
        )
        //return <img src={url} key={key} style={imgStyle} />
      });

    const albumStyle = {
      paddingLeft: constants.pageMargin,
      paddingTop: constants.pageMargin,
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
    }

    return (
      <div style={albumStyle}>
        { images }
      </div>
    );
  }
}

export default AlbumIndex;
