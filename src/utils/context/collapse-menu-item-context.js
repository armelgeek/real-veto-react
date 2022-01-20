import React, { useState } from "react";
const CollapseMenuContext = React.createContext();

function CollapseMenu({ children }) {
  const [collapse, setCollapse] = useState(false)
  const value = { collapse,setCollapse };
  return <CollapseMenuContext.Provider value={value}>{children}</CollapseMenuContext.Provider>;
}

function Item({ children }) {
  return (
    <CollapseMenuContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error("Item  must be used within a CollapseMenu");
        }
        return children(context);
      }}
    </CollapseMenuContext.Consumer>
  );
}
export { CollapseMenu, Item };
