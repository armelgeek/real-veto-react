import React from "react";
import { Box } from "@chakra-ui/layout";
import { useSelector, useDispatch } from "react-redux";
import { action, getData } from "../lib/call";
import { useParams } from "react-router";
const GetDataContext = React.createContext();

function GetOne({ model, children }) {
  const { id } = useParams();
  const [regenerate, setRegenerate] = React.useState(true);
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
  const value = { data: data[0], meta, setRegenerate };
  return (
    <GetDataContext.Provider value={value}>{children}</GetDataContext.Provider>
  );
}

function GetOneById({ model, id, children }) {
  const [regenerate, setRegenerate] = React.useState(false);
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
  const value = { data: data[0], meta, setRegenerate };
  return (
    <GetDataContext.Provider value={value}>{children}</GetDataContext.Provider>
  );
}
function GetAll({ model, options, children }) {
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
function GetByAction({ model, operationClass, children }) {
    const [regenerate, setRegenerate] = React.useState(false);
    const data = useSelector(getData(model).value);
    const meta = useSelector(getData(model).meta);
    const dispatch = useDispatch();
    React.useEffect(() => {
      dispatch(operationClass());
    }, []);
    React.useEffect(() => {
      if (regenerate === true) {
        dispatch(operationClass());
        setRegenerate(false);
      }
      return () => {
        setRegenerate(false);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [regenerate]);
    const value = { data: data[0], meta, setRegenerate };
    return (
      <GetDataContext.Provider value={value}>{children}</GetDataContext.Provider>
    );
  }


export { GetAll,GetOneById, GetOne, Data,GetByAction };
