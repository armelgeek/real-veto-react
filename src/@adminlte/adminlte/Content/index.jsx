import React, { useMemo } from "react";
function Content({ children }) {
  const content = useMemo(() => (
    <div
      className="content-wrapper"
    >
      {children}
    </div>
  ), [children])
  return content;
}
export default Content;
