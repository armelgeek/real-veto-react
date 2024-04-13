export const countReducer = (state = { counter: 0 }, action) => {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          counter: state.counter + 1
        };
      default:
        return state;
    }
  };