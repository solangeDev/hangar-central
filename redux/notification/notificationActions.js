import notificationTypes from './notificationTypes';

//Action Creator
export const setNotification = data => ({
  type: notificationTypes.SET_NOTIFICATION,
  payload: data,
});
