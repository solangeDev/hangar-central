import notificationTypes from './notificationTypes';

const initialState = {
  status: 'error',
  isShow: false,
  description: '',
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationTypes.SET_NOTIFICATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default notificationReducer;
