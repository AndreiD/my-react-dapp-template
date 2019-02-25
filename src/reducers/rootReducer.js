const initalState = {
  networkName: 'Checking...',
  account: null,  //address of the currently unlocked metamask
  badges: []
};

const rootReducer = (state = initalState, action) => {
  const newState = { ...state };
  console.log("reducer: newState =", newState, " action =", action)

  switch (action.type) {
    case "AGE_UP":
      return {
        ...state,
        age: state.age + action.value,
        history: state.history.concat({ age: state.age + action.value, id: Math.random() })
      }
    case "AGE_DOWN":
      return {
        ...state,
        age: state.age - action.value,
        history: state.history.concat({ age: state.age + action.value, id: Math.random() })
      }
    default:
      break;
  }
  return newState;
}


export default rootReducer
