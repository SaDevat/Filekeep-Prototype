import React from "react";

const Subcompartment = props => {
  var { json, fileid, big } = props;
  var width, height;
  if (big) {
    width = "150px";
    height = "200px";
  } else {
    width = "100px";
    height = "auto";
  }
  return (
    <div
      key={fileid}
      style={{
        width: width,
        height: height,
        background: "lime",
        display: "inline-block",
        margin: "10px"
      }}
    >
      <a
        href={
          json.files[fileid].hasOwnProperty("download")
            ? json.files[fileid].download
            : undefined
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3>{json.files[fileid].name}</h3>
      </a>
      {big && (
        <img
          src={
            json.files[fileid].hasOwnProperty("download")
              ? json.files[fileid].download
              : undefined
          }
          alt="Loading..."
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
};

export default Subcompartment;
