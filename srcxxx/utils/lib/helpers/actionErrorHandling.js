const ERROR = "ERROR";

const errorHandler = (err) => (dispatch) => {
  if (err.response != null) {
    if (err.response.status != null) {
      if (err.response.status === 404) {
        dispatch({
          type: ERROR,
          payload: {
            code: 404,
            customMessage:
              "What you are looking for has either moved or never existed. Try going back and searching again.",
          },
        });
        return;
      } else if (err.response.status === 429) {
        dispatch({
          type: ERROR,
          payload: {
            code: 429,
            customMessage:
              "You have performed too many requests recently. Wait a few minutes and try again.",
          },
        });
        return;
      }
      //and so on
    }
  }

  dispatch({
    type: ERROR,
    payload: { code: 520, customMessage: "Unknown error" },
  });
  return;
};

export default errorHandler;

/*
if (error) {
    dispatch(actionCreators.createError(error, record));
    throw error;
  } else if (error.message) {
    dispatch(actionCreators.createError(error, record));
  } else if (error?.response?.data?.message) {
    dispatch(
      actionCreators.createError(error?.response.data.message, record)
    );
  }
  console.error(`creating ${resourceName} failed`);*/