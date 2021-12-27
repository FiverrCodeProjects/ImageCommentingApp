import React, { Component, ChangeEvent } from 'react';

interface Props  {
  addImage:(image: string | ArrayBuffer) => void;
};

export default class extends Component<Props> {
  handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { addImage } = this.props;
    const reader = new FileReader();
    // @ts-ignore
    const file = event.target.files[0];
    reader.onloadend = () => {
      if (reader.result) {
        addImage(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };
  render() {
    return (
      <div className="fileUpload">
        <span className="fileText">+</span>
        <span className="spanUpload">upload</span>
        <input
          type="file"
          className="inputUpload"
          onChange={e => this.handleImageChange(e)}
        />
      </div>
    );
  }
}
