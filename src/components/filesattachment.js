import React from "react";

import "./css/file.css";

const Subcompartment = props => {
  var { json, fileid, big } = props;
  var classname = "";
  var classname2 = "";
  if (!big) {
    classname = "smallfilediv";
    classname2 = "col-lg-6 col-md-12 m-0";
  }
  return (
    <div className={classname2}>
      <div key={fileid} id="filediv" className={big ? "" : "setwidth100"}>
        <a
          href={
            json.files[fileid].hasOwnProperty("download")
              ? json.files[fileid].download
              : undefined
          }
          target="_blank"
          rel="noopener noreferrer"
          className={classname}
        >
          {json.files[fileid].name} <i className="fas fa-file-download" />
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
    </div>
  );
};

export default Subcompartment;
