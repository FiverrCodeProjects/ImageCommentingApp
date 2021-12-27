import React, { Component, CSSProperties, MouseEvent } from 'react';
import ReactCursorPosition from 'react-cursor-position';
import Measure from 'react-measure';
import Point from './point';
import { setPoint } from '../utility';
import styles from '../styles';
import { CurrentPosition, Dimensions, Image } from '../types';

const style = styles.ImagePreview;
type ImgLegacyRef = React.LegacyRef<HTMLImageElement>
interface Props {
  dimensions: Dimensions;
  selectedImage: Image;
  points: Array<string>;
  selectedPoint: string;
  showPoints: boolean;
  newPoint: string;
  setDimensions: (bounds: any) => void;
  setSelectedPoint: (point: string | null) => void;
  setNewPoint:(point: string) => void;
};
export default class extends Component<Props> {
  currentPosition!: CurrentPosition;
  setComment = (event: MouseEvent) => {
    event.stopPropagation();
    const { dimensions, setNewPoint } = this.props;
    const newPoint = setPoint(dimensions, this.currentPosition);
    if (newPoint) {
      setNewPoint(newPoint);
    }
  };
  render() {
    const {
      dimensions,
      selectedImage,
      points,
      selectedPoint,
      showPoints,
      newPoint,
      setDimensions,
      setSelectedPoint
    } = this.props;

    return (
      <div style={style.main}>
        <Measure bounds onResize={(measure: any) => setDimensions(measure.bounds)}>
          {({ measureRef }: {measureRef: ImgLegacyRef}) => (
            <div>
              <ReactCursorPosition
                onPositionChanged={(currentPosition: CurrentPosition) =>
                  (this.currentPosition = currentPosition)}
              >
                <div onClick={this.setComment}>
                  <div style={style.commentDiv as CSSProperties}>
                    <img
                      style={style.mainImage}
                      alt="#"
                      ref={measureRef}
                      src={selectedImage.file}
                    />
                  </div>
                  <div style={style.commentDiv as CSSProperties}>
                    {points.map(point => (
                      <Point
                        id={point}
                        key={point}
                        dimensions={dimensions}
                        showPoints={showPoints}
                        selectedPoint={selectedPoint}
                        setSelectedPoint={setSelectedPoint}
                      />
                    ))}
                    {(newPoint) ? (
                      <Point
                        id={newPoint}
                        key={newPoint}
                        dimensions={dimensions}
                        showPoints={showPoints}
                        // @ts-ignore
                        newPoint
                        selectedPoint={selectedPoint}
                        setSelectedPoint={setSelectedPoint}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </ReactCursorPosition>
            </div>
          )}
        </Measure>
      </div>
    );
  }
}
