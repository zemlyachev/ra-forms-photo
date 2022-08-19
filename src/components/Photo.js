import React from "react";
import PropTypes from "prop-types";
import ImgModel from "../models/PhotoModel";

function Photo(props) {
  const { file } = props;
  const handleRemove = (id) => {
    props.handleRemove(id);
  };

  return (
    <div className="photo-card-container">
      <div className="photo-card shadow" key={file.id}>
        <img src={file.url} alt={file.name} className="card" />
      </div>
      <button
        className="remove-btn shadow"
        onClick={() => handleRemove(file.id)}
      >
        <i className="material-icons" title={"Remove " + file.name}>
          close
        </i>
      </button>
    </div>
  );
}

Photo.propTypes = {
  props: PropTypes.arrayOf(PropTypes.instanceOf(ImgModel)),
};

export default Photo;
