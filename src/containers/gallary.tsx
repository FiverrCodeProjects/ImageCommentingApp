import React, { ChangeEvent, Component, CSSProperties } from 'react';
import { connect } from 'react-redux';
import ImagePicker from '../components/imagePicker';
import SingleImage from '../components/singleImage';
import actions from '../redux/actions';
import styles from '../styles';
import { Image, RootState } from '../types';

const { addImage, changSelectedeImage, setSelectedPoint } = actions;
const style = styles.Gallary;

interface Props {
  images: Array<Image>; 
  changSelectedeImage: (image: Image) => void; 
  setSelectedPoint:(point: string | null) => void;
  addImage:(image: string | ArrayBuffer) => void;
};

class Gallary extends Component<Props, {}> {
  handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
  };

  handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const reader = new FileReader();
    // @ts-ignore
    const file = event.target.files[0];
    reader.onloadend = () => {
      if (reader.result) {
        this.props.addImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  render() {
    const { images, changSelectedeImage, setSelectedPoint } = this.props;
    return (
      <div
        style={style.main}
        onClick={() => {
          setSelectedPoint(null);
        }}
      >
        <ImagePicker addImage={this.props.addImage} />
        <div style={style.images as CSSProperties}>
          {images.map(image => (
            <SingleImage
              key={image.id}
              image={image}
              changSelectedeImage={changSelectedeImage}
            />
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const images = state.reducers.images;
  return { images };
}

const mapDispatchToProps = {
  addImage,
  changSelectedeImage,
  setSelectedPoint
}

export default connect<{}, {}, any, RootState>(mapStateToProps, mapDispatchToProps )(Gallary);
