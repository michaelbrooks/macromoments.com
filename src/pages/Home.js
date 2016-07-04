import React, { PropTypes } from 'react';
import Slider from 'react-slick';
require('slick-carousel/slick/slick.css');
require('slick-carousel/slick/slick-theme.css');

import FadeImage from '../components/fade_image';
import RouteHelper from '../components/route_helper';
import albums from '../components/albums';

const slides = [
  albums.getMetaByName('animals', 'TM 2015 Victoria BC425.jpg'),
  albums.getMetaByName('nature', 'ON 2007 (72).jpg'),
  albums.getMetaByName('other', 'DTO 2007 (26).JPG'),
  albums.getMetaByName('tea', 'Arbor Dar 2nd Makaibari Org Dry.JPG'),
];

@RouteHelper
export default class Home extends React.Component {

  static propTypes = {
    goToImage: PropTypes.func.isRequired,
  };

  _imageClickHandler = (album, index) => () => {
    this.props.goToImage(album, index);
  }

  render() {
    const settings = {
      autoplay: true,
      autoplaySpeed: 8000, // delay in ms
      centerMode: true,
      dots: true,
      infinite: true,
      fade: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      arrows: false,
    };

    return (
      <div>
        <Slider {...settings}>
          {
            slides.map(({ album, imageIndex }, idx) => {
              const url = albums.loadImage(album, imageIndex);
              return (
                <div key={idx}>
                  <FadeImage src={url} onClick={this._imageClickHandler(album, imageIndex)}/>
                </div>
              );
            })
          }
        </Slider>
      </div>
    );
  }
}
