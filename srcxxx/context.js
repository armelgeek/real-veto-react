import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { action, getData } from "./utils/lib/call";
const GetDataContext = React.createContext();

function GetOne({ model ,children }) {
  const { id } = useParams();
  const [regenerate, setRegenerate] = React.useState(false)
  const data = useSelector(getData(model).value);
  const meta = useSelector(getData(model).meta);
  const dispatch = useDispatch();
  React.useEffect(() => {
      dispatch(action(model).get(id));

  }, [id]);
  React.useEffect(() => {
    if (regenerate == true) {
      dispatch(action(model).get(id));
      setRegenerate(false);
    }
    return () => {
      setRegenerate(false);
    };

  }, [regenerate]);
  const value = { data:data[0], meta,setRegenerate };
  return (
    <GetDataContext.Provider value={value}>{children}</GetDataContext.Provider>
  );
}

function GetAll({ model,options,children }) {
  const data = useSelector(getData(model).value);
  const meta = useSelector(getData(model).meta);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(action(model).fetch(options));
  }, [options]);
  const value = { data, meta };
  return (
    <GetDataContext.Provider value={value}>{children}</GetDataContext.Provider>
  );
}
function Data({ children }) {
  return (
    <GetDataContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error("Data  must be used within a GetDataContext");
        }
        return children(context);
      }}
    </GetDataContext.Consumer>
  );
}
export { GetAll,GetOne, Data };
