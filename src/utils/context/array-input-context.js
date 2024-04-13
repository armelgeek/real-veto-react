import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { useSelector, useDispatch } from "react-redux";
const ArrayInputContext = React.createContext();

function ArrayInputElement({ children, shareholder, idx, onChange }) {
  const [state, setState] = useState(null);
  const value = { data: shareholder, key: idx, onChange: onChange,state:state,setState:setState };
  return (
    <ArrayInputContext.Provider value={value}>
      {children}
    </ArrayInputContext.Provider>
  );
}

function ArrayInputItem({ children }) {
  return (
    <ArrayInputContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error("Element  must be used within a ArrayInputContext");
        }
        return children(context);
      }}
    </ArrayInputContext.Consumer>
  );
}
export { ArrayInputElement,ArrayInputItem };
