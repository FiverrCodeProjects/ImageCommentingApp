import React, { Component, CSSProperties } from 'react';
import { connect } from 'react-redux';
import BlankCenterDiv from '../components/blankCenterDiv';
import ImageHeader from '../components/imageHeader';
import ImagePreview from '../components/imagePreview';
import AllComments from '../components/allComments';
import actions from '../redux/actions';
import styles from '../styles';
import { Dimensions, Image as ImageType, RootState, State} from '../types';

const {
  setDimensions,
  editImage,
  deleteImage,
  setNewPoint,
  setSelectedPoint,
  toggleOptions
} = actions;
const style = styles.SelectedImage;


type Image = {
  name: string;
} & ImageType;

interface Props {
  dimensions: Dimensions;
  selectedImage: Image;
  points: Array<string>;
  selectedPoint: string;
  showPoints: boolean;
  newPoint: string;
  showAllComments: boolean;
  notSelected: string;
  toggleOptions: (key: string, value: any) => void
  setDimensions: (bounds: any) => void;
  setNewPoint:(point: string) => void;
  editImage: (image: Image) => void; 
  deleteImage:(image: Image) => void; 
  setSelectedPoint:(point: string | null) => void;
};

class SelectedImage extends Component<Props> {
  render() {
    const {
      dimensions,
      selectedImage,
      notSelected,
      points,
      selectedPoint,
      newPoint,
      showPoints,
      showAllComments,
      setDimensions,
      editImage,
      deleteImage,
      setNewPoint,
      setSelectedPoint,
      toggleOptions
    } = this.props;
    if (notSelected) {
      return <BlankCenterDiv text={notSelected} />;
    }
    const imagePreViewProps = {
      dimensions,
      selectedImage,
      points,
      selectedPoint,
      newPoint,
      showPoints,
      setDimensions,
      setNewPoint,
      setSelectedPoint
    };
    const paddingLeft = `${Math.round(
      (window.innerWidth - dimensions.width) / 2
    )}px`;
    return (
      <div
        style={style.main}
        onClick={event => {
          event.stopPropagation();
          setSelectedPoint(null);
        }}
      >
        <div style={style.imageBody as CSSProperties}>
          <ImageHeader
            image={selectedImage}
            editImage={editImage}
            deleteImage={deleteImage}
            setSelectedPoint={setSelectedPoint}
          />
          <div style={style.settingsWrapper}>
            <button
              className="simpleButton"
              onClick={() => {
                toggleOptions('showPoints', !showPoints);
              }}
            >
              {showPoints ? 'Hide Points' : 'Show Points'}
            </button>
            <button
              className="simpleButton"
              onClick={() => {
                toggleOptions('showAllComments', !showAllComments);
              }}
            >
              {showAllComments ? 'Hide Comments' : 'Show Comments'}
            </button>
          </div>
          <div
            style={{
              height: dimensions.height,
              ...style.imageWrapper,
              paddingLeft
            }}
          >
            <ImagePreview {...imagePreViewProps} />
          </div>
        </div>
        <AllComments />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState ): Partial<State> => {
  const {
    dimensions,
    images,
    selectedImage,
    points,
    selectedPoint,
    newPoint,
    showPoints,
    showAllComments
  } = state.reducers;
  if (images!.length === 0) {
    return {
      notSelected: 'Please  upload a new Image'
    };
  }
  if (!selectedImage) {
    return {
      notSelected: 'Please Select a Picture or Upload a Image'
    };
  }
  const { id } = selectedImage;
  return {
    dimensions,
    selectedImage,
    points: points[id],
    selectedPoint,
    newPoint,
    showPoints,
    showAllComments
  };
}

const mapDispatchToProps = {
  setDimensions,
  editImage,
  deleteImage,
  setNewPoint,
  setSelectedPoint,
  toggleOptions
}

// connect<IMapStateToProps, IMapDispatchToProps, ICompProps, IReduxState>
export default connect<{}, {}, any, RootState>(mapStateToProps, mapDispatchToProps)(SelectedImage);
