import React, { Component } from 'react';
import PointComments from './pointComments';
import { getPointData } from '../utility';
import { colors } from '../styles';
import { Dimensions} from '../types';

const pointRadius = 5;

interface Props {
  id: string;
  dimensions: Dimensions
  selectedPoint: string | null;
  newPoint?: string;
  showPoints: boolean;
  width?: number;
  height?: number;
  setSelectedPoint: (point: string | null) => void;
};
export default class extends Component<Props>{
  render() {
    const {
      id,
      selectedPoint,
      newPoint,
      showPoints,
      setSelectedPoint
    } = this.props;
    const { width, height } = getPointData(this.props);
    const marginTop = height - pointRadius;
    const marginLeft = width - pointRadius;
    const backgroundColor = showPoints
      ? selectedPoint === id ? colors.selectedPoint : colors.primary
      : colors.transparent;
    return (
      <div
        style={{
          position: 'absolute',
          marginTop,
          marginLeft
        }}
      >
        <div
          style={{
            width: pointRadius * 2,
            height: pointRadius * 2,
            backgroundColor,
            borderRadius: '50%'
          }}
          onClick={event => {
            event.stopPropagation();
            const newSelectedPoint = id === selectedPoint ? null : id;
            setSelectedPoint(newSelectedPoint);
          }}
        />
        <PointComments newPoint={newPoint} pointId={id} />
      </div>
    );
  }
}
