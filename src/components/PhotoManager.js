import React, { useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import ImgModel from "../models/PhotoModel";
import Photo from "./Photo";

function PhotoManager(props) {
  const [files, setFiles] = useState([]);

  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.addEventListener("load", (evt) => {
        resolve(evt.currentTarget.result);
      });

      fileReader.addEventListener("error", (evt) => {
        reject(new Error(evt.currentTarget.error));
      });

      fileReader.readAsDataURL(file);
    });
  };

  const handleSelect = async (e) => {
    const filesAdded = [...e.target.files];
    const newFiles = [];
    const filesWithUrls = await Promise.all(
      filesAdded.map((o) =>
        fileToDataUrl(o).then((result) =>
          newFiles.push(new ImgModel(nanoid(), result, o.name))
        )
      )
    ).then(() => {
      return newFiles;
    });

    setFiles((prevFiles) => prevFiles.concat(filesWithUrls));
  };

  const handleRemove = (id) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  return (
    <div className="container">
      <div className="select-container">
        <label htmlFor="input" className="select-label shadow">
          <h2>Click to select</h2>
        </label>
        <input
          type="file"
          name="input"
          accept="image/*"
          onChange={handleSelect}
          id="input"
          className="select-input"
          multiple
        />
      </div>
      <div className="photo-container">
        {files.map((file) => (
          <Photo file={file} handleRemove={handleRemove} key={file.id} />
        ))}
      </div>
    </div>
  );
}

PhotoManager.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(ImgModel)),
};

export default PhotoManager;
