import React from "react";
import reactFastCompare from "react-fast-compare";

function ActiveLink({ title }) {
  return (
    <>
      <li className="breadcrumb-item active">{title}</li>
    </>
  );
}

export default React.memo(ActiveLink, reactFastCompare);
