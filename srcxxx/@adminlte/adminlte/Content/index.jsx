import React from "react";
import reactFastCompare from "react-fast-compare";

function Content({ children }) {
  return (
    <>
      <div
        className="content-wrapper"
      >
        {children}
      </div>
    </>
  );
}
export default React.memo(Content, reactFastCompare);
