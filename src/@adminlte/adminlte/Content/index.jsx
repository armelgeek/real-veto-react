import React from "react";
import reactFastCompare from "react-fast-compare";

function Content({ children }) {
  return (
    <>
      <div
        class="content-wrapper"
        style={{ height: "100vh", maxHeight: "100vh", overflowY: "auto" }}
      >
        {children}
      </div>
    </>
  );
}
export default React.memo(Content, reactFastCompare);
