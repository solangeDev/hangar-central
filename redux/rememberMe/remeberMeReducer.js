import rememberMeTypes from './rememberMeTypes';

const initialState = {
  rememberme: false,
  email: '',
  password: '',
};

const rememberMeReducer = (state = initialState, action) => {
  switch (action.type) {
    case rememberMeTypes.SET_REMEMBERME:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default rememberMeReducer;
