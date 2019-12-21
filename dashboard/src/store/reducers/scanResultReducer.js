const INITIAL_STATE = {
  results: [],
};

export const scanResultReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_RESULTS':
    const { results } = action;
    return { ...state, results};
  default:
    return state;
  }
};
