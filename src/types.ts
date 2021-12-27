// shared types
// Image Dimension types
export type Dimensions = {
  height: number;
  width: number;
}

// Image Point
export type Point = {
  x: number;
  y: number;
}

export type Image = {
  file: string ;
  name?: string;
  id: string | number;
};

export type SelectedImage = {
  id: number;
  file: string;
};

export type CurrentPosition = {
  position: Point;
};

export type Comment = {
  id: number;
  user: string;
  time: string | number;
  comment?: string;
  pointId?: string | number;
};


interface Comments {
  [index: number]: [];
};

interface Points {
  [index: number]: [];
};

// Type for state, passed to the root reducer function
export interface State {
  images: Array<Image>;
  points: Points;
  comments: Comments
  selectedImage: SelectedImage | null
  newPoint: Point | null;
  selectedPoint: string | null;
  dimensions: Dimensions;
  showAllComments: boolean;
  notSelected: string;
  showPoints: boolean;
}

// Type For parameter passed to mapStateToProps function
export interface RootState {
  reducers: State
}