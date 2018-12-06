import React from "react";

const Subcompartment = props => {
  var { big, uploadnewtostr, node, writenewtodb } = props;
  var style;

  if (big) {
    style = {
      background: "#6A5ACD",
      display: "inline-block",
      padding: "10px",
      width: "200px",
      margin: "20px"
    };
  } else {
    style = {
      background: "#6A5ACD",
      display: "inline-block",
      padding: "5px",
      width: "100px",
      margin: "5px"
    };
  }

  return (
    <div style={style}>
      <p>Add New:</p>
      <input
        type="text"
        onKeyPress={e => writenewtodb(node, e)}
        style={{ width: "90%" }}
      />
      <hr />
      <p>Add attachment:</p>
      <input type="file" onChange={e => uploadnewtostr(node, e)} />
    </div>
  );
};

export default Subcompartment;
