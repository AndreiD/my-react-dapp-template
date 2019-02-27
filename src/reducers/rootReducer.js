const initalState = {
  tokenAmount: null
};


const rootReducer = (state = initalState, action) => {
  const newState = {
    ...state
  };
  console.log("reducer: newState =", newState, " action =", action)

  switch (action.type) {
    case "LOAD_TOKEN_AMOUNT":
      return {
        ...state,
        tokenAmount: this.action.balance
      }
    default:
      break;
  }
  return newState;
}


export default rootReducer
