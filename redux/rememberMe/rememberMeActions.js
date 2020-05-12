import rememberMeTypes from './rememberMeTypes';

//Action Creator
export const setRememberMe = data => ({
  type: rememberMeTypes.SET_REMEMBERME,
  payload: data,
});
