import React from 'react';

export default class Album extends React.Component {

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}