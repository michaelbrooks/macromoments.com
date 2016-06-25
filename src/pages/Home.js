import React from 'react';
import Slider from 'react-slick';
require('slick-carousel/slick/slick.css');
require('slick-carousel/slick/slick-theme.css');

import FadeImage from '../components/fade_image';
import albums from '../components/albums';

const slides = [
  albums.getImageByName('abstract', 'DSC04178e.jpg'),
  albums.getImageByName('abstract', 'DSC04211e.jpg'),
];

export default class Home extends React.Component {

  render() {
    const settings = {
      autoplay: true,
      autoplaySpeed: 5000, // delay in ms
      centerMode: true,
      dots: true,
      infinite: true,
      fade: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      arrows: false,
    };

    return (
      <div>
        <Slider {...settings}>
          {
            slides.map((url, idx) => (
              <div key={idx}>
                <FadeImage src={url}/>
              </div>
            ))
          }
        </Slider>
      </div>
    );
  }
}
