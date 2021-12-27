import React, { Component, CSSProperties } from 'react';
import styles from '../styles';
import { Image } from '../types';

const style = styles.SingleImage;

interface Props  {
  image: Image;
  changSelectedeImage:(image: Image) => void;
};

export default class extends Component<Props> {
  render() {
    const { image, changSelectedeImage } = this.props;
    return (
      <button
        type="button"
        style={style.button}
        onClick={event => {
          event.preventDefault();
          changSelectedeImage(image);
        }}
      >
        <img alt="#" style={style.image as CSSProperties} src={image.file} />
        <span style={style.name as CSSProperties}>{image.name || 'No Name'}</span>
      </button>
    );
  }
}
