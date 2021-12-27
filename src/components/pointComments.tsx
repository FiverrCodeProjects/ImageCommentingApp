import React, { Component, CSSProperties } from 'react';
import { connect } from 'react-redux';
import InputSearch from './inputSearch';
import actions from '../redux/actions';
import { timeDifference } from '../utility';
import styles from '../styles';
import { RootState, Comment } from '../types';

const { setComments } = actions;
const style = styles.PointComments;

const removePoint = (points: Array<number>, pointId: number): Array<number> => {
  const newPoints: Array<number> = [];
  points.forEach(point => {
    if (point !== pointId) {
      newPoints.push(point);
    }
  });
  return newPoints;
};


const removeComment = (comments: Array<Comment>, deletedComment: Comment) => {
  const newComments: Array<Comment> = [];
  comments.forEach(singleComment => {
    if (deletedComment.id !== singleComment.id) {
      newComments.push(singleComment);
    }
  });
  return newComments;
};

interface Props {
  selectedImage: string;
  points: Array<number>
  newPoint?: string;
  selectedPoint: number;
  pointId?: number | string;
  comments: Array<Comment>;
  thisPointComments: Array<JSX.Element>
  setComments: (selectedImage: string, newPoints: Array<number>, newComments: Array<Comment>, pointId?: number) => void;
};

class PointComments extends Component<Props, {}, {}> {
  render() {
    const {
      selectedImage,
      points,
      newPoint,
      selectedPoint,
      pointId,
      comments,
      thisPointComments,
      setComments
    } = this.props;
    if (selectedPoint !== pointId) {
      return <div />;
    }
    const commentComponent = (comment: Comment ) => (
      <div style={style.commentComponent as CSSProperties} key={comment.id}>
        <div style={style.commentBody}>
          <span style={style.commentUser}>{comment.user}</span>
          <span style={style.commentTime}>{timeDifference(comment.time)}</span>
          <span
            style={style.commentDelete as CSSProperties}
            onClick={event => {
              event.stopPropagation();
              const newPoints =
                thisPointComments.length === 1
                  ? removePoint(points, pointId)
                  : points;
              const newComments = removeComment(comments, comment);
              setComments(selectedImage, newPoints, newComments, pointId);
            }}
          >
            X
          </span>
        </div>
        <span style={style.commentSpan as CSSProperties}>{comment.comment}</span>
      </div>
    );
    return (
      <div
        onClick={event => {
          event.stopPropagation();
        }}
        style={style.main as CSSProperties}
      >
        <div style={style.header as CSSProperties}>
          <span style={style.headerSpan}>
            {newPoint ? 'Add comment' : 'Comments'}
          </span>
        </div>
        <div style={style.commentsWrapper as CSSProperties}>
         {/* @ts-ignore */}
          {thisPointComments.map(commentComponent)}
        </div>
        <InputSearch
          autoFocus
          clearOnSearch
          placeholder="comment here"
          style={style.input}
          onSearch={comment => {
            if (comment) {
              const newComment = {
                comment,
                id: new Date().getTime(),
                time: new Date().getTime(),
                user: 'User',
                pointId
              };
              const newComments = [newComment, ...comments];
              const newPoints = newPoint ? [pointId, ...points] : points;
              setComments(selectedImage, newPoints, newComments);
            }
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  const { selectedImage, points, comments, selectedPoint } = state.reducers;
  const {id}  = selectedImage!;
  const thisPointComments: Array<Comment> = [];
  comments[id].forEach((comment: Comment) => {
    if (comment.pointId === selectedPoint) {
      thisPointComments.push(comment);
    }
  });
  return {
    selectedImage,
    points: points[id],
    comments: comments[id],
    thisPointComments,
    selectedPoint
  };
}
export default connect<{}, {}, any, RootState>(mapStateToProps, { setComments })(PointComments);
