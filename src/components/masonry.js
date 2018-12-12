import React from "react";

const MasonryLayout = props => {
  const columnWrapper = {};
  const result = [];

  // create columns
  for (let i = 0; i < props.columns; i++) {
    columnWrapper[`column${i}`] = [];
  }

  // divide children into columns
  for (let i = 0; i < props.render.length; i++) {
    const columnIndex = i % props.columns;
    columnWrapper[`column${columnIndex}`].push(
      <div key={props.render[i].key} style={{ marginBottom: `${props.gap}px` }}>
        {props.render[i]}
      </div>
    );
  }

  // wrap children in each column with a div
  for (let i = 0; i < props.columns; i++) {
    result.push(
      <div
        key={i}
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`,
          flex: 1
        }}
      >
        {columnWrapper[`column${i}`]}
      </div>
    );
  }

  return <div style={{ display: "flex" }}>{result}</div>;
};

export default MasonryLayout;
