import { Point, Dimensions, SelectedImage } from '../types'
// Action Types
type ADD_IMAGE = 'ADD_IMAGE';
type CHANGE_SELECTED_IMAGE = 'CHANGE_SELECTED_IMAGE';
type EDIT_IMAGE = 'EDIT_IMAGE';
type DELETE_IMAGE = 'DELETE_IMAGE';
type TOGGLE_OPTIONS = 'TOGGLE_OPTIONS';
type SET_DIMENSION = 'SET_DIMENSION';
type SET_NEW_POINT = 'SET_NEW_POINT';
type SET_SELECTED_POINT = 'SET_SELECTED_POINT';
type SET_COMMENTS = 'SET_COMMENTS';

// Actions
type AddImageAction = {
  type: ADD_IMAGE;
  newImage: {
    id: number;
    file: string | ArrayBuffer
  }
};

type ChangSelectedeImageAction = {
  type: CHANGE_SELECTED_IMAGE;
  id: string
};

type EditImageAction = {
  type: EDIT_IMAGE;
  image: File;
};

type DeleteImageAction = {
  type: DELETE_IMAGE;
  image: File;
};

type ToggleOptionsAction = {
  type: TOGGLE_OPTIONS;
  key: number;
  value: any;
};

type SetDimensionsAction = {
  type: SET_DIMENSION;
  dimensions: Dimensions;
};

type SetNewPointAction = {
  type: SET_NEW_POINT;
  newPoint: Point
};

export type SetSelectedPointAction = {
  type: SET_SELECTED_POINT;
  selectedPoint: Point;
};


type SetCommentsAction = {
  type: SET_COMMENTS;
  selectedImage: SelectedImage
  points: Point;
  comments: string;
  newPoint: Point;
};

type Actions = {
  ADD_IMAGE: ADD_IMAGE;
  CHANGE_SELECTED_IMAGE: CHANGE_SELECTED_IMAGE,
  EDIT_IMAGE: EDIT_IMAGE,
  DELETE_IMAGE: DELETE_IMAGE,
  TOGGLE_OPTIONS: TOGGLE_OPTIONS,
  SET_DIMENSION: SET_DIMENSION,
  SET_NEW_POINT: SET_NEW_POINT,
  SET_SELECTED_POINT: SET_SELECTED_POINT,
  SET_COMMENTS: SET_COMMENTS;
  addImage: (file: string | ArrayBuffer) => (dispatch: (action: AddImageAction) => void, getState: () => any) => any;
  changSelectedeImage: (id: string) => ChangSelectedeImageAction;
  editImage: (image: File) => EditImageAction;
  deleteImage: (image: File) => DeleteImageAction;
  toggleOptions: (key: number, value: any) => ToggleOptionsAction;
  setDimensions: (dimensions: Dimensions) => SetDimensionsAction;
  setNewPoint: (newPoint: Point) => SetNewPointAction;
  setSelectedPoint: (selectedPoint: Point) => SetSelectedPointAction;
  setComments: (selectedImage: SelectedImage, points: Point, comments: string, newPoint: Point) => SetCommentsAction;
};

const actions: Actions = {
  ADD_IMAGE: 'ADD_IMAGE',
  CHANGE_SELECTED_IMAGE: 'CHANGE_SELECTED_IMAGE',
  EDIT_IMAGE: 'EDIT_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
  TOGGLE_OPTIONS: 'TOGGLE_OPTIONS',
  SET_DIMENSION: 'SET_DIMENSION',
  SET_NEW_POINT: 'SET_NEW_POINT',
  SET_SELECTED_POINT: 'SET_SELECTED_POINT',
  SET_COMMENTS: 'SET_COMMENTS',
  addImage: file => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_IMAGE,
        newImage: {
          id: new Date().getTime(),
          file
        }
      });
    };
  },
  changSelectedeImage: id => ({
    type: actions.CHANGE_SELECTED_IMAGE,
    id
  }),
  editImage: image => ({
    type: actions.EDIT_IMAGE,
    image
  }),
  deleteImage: image => ({
    type: actions.DELETE_IMAGE,
    image
  }),
  toggleOptions: (key, value) => ({
    type: actions.TOGGLE_OPTIONS,
    key,
    value
  }),
  setDimensions: dimensions => ({
    type: actions.SET_DIMENSION,
    dimensions
  }),
  setNewPoint: newPoint => ({
    type: actions.SET_NEW_POINT,
    newPoint
  }),
  setSelectedPoint: selectedPoint => ({
    type: actions.SET_SELECTED_POINT,
    selectedPoint
  }),
  setComments: (selectedImage, points, comments, newPoint) => ({
    type: actions.SET_COMMENTS,
    selectedImage,
    points,
    comments,
    newPoint
  })
};

export type Action = AddImageAction | ChangSelectedeImageAction | EditImageAction | DeleteImageAction | ToggleOptionsAction | SetDimensionsAction | SetNewPointAction | SetSelectedPointAction | SetCommentsAction;
export default actions;
