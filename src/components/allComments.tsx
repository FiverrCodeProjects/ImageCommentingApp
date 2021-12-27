import React, { Component, CSSProperties } from 'react';
import { connect } from 'react-redux';
import BlankCenterDiv from './blankCenterDiv';
import actions, { SetSelectedPointAction } from '../redux/actions';
import { timeDifference } from '../utility';
import styles from '../styles';
import { Dimensions, Point, Comment, RootState } from '../types';


const { setSelectedPoint } = actions;
const style = styles.AllComments;

interface Props  {
  dimensions: Dimensions;
  selectedPoint: string | null;
  showAllComments: boolean;
  comments: Array<Comment>
  setSelectedPoint: (selectedPoint: string | Point | number) => SetSelectedPointAction;
};


class AllComments extends Component<Props> {
  render() {
    const {
      dimensions,
      selectedPoint,
      showAllComments,
      comments,
      setSelectedPoint
    } = this.props;
    const commentComponent = (comment: Comment ) => (
      <div
        key={comment.id}
        style={
          comment.pointId === selectedPoint ? (
            style.selecteCommentComponent as CSSProperties
          ) : (
            style.commentComponent as CSSProperties
          )
        }
        onClick={event => {
          event.stopPropagation();
          setSelectedPoint(comment.pointId!);
        }}
      >
        <div style={style.commentBody}>
          <span style={style.commentUser}>{comment.user}</span>
          <span style={style.commentTime}>{timeDifference(comment.time)}</span>
        </div>
        <span style={style.commentSpan as CSSProperties}>{comment.comment}</span>
      </div>
    );
    const bodyStyle = showAllComments ? style.main : style.mainHidden;
    return (
      <div style={{ ...bodyStyle, height: dimensions.height } as CSSProperties}>
        <span style={style.header}>All Comments</span>
        {comments.length === 0 ? (
          <BlankCenterDiv text="No Comments" />
        ) : (
          comments.map(commentComponent)
        )}
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  const {
    dimensions,
    selectedImage,
    selectedPoint,
    comments,
    showAllComments
  } = state.reducers;
  const { id } = selectedImage!;
  return {
    dimensions,
    selectedImage,
    selectedPoint,
    showAllComments,
    comments: comments[id]
  };
}
export default connect<{}, {}, any, RootState>(mapStateToProps, { setSelectedPoint })(AllComments);
