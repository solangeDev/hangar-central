import registerTypes from './registerTypes';

//Action Creator
export const setRegister = data => ({
  type: registerTypes.SET_STEP_1,
  payload: data,
});
