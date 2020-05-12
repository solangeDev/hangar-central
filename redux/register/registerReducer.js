import registerTypes from './registerTypes';

const initialState = {
  email: '',
  password: '',
  validateCode: false,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case registerTypes.SET_STEP_1:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default registerReducer;
