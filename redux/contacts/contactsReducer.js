import contactsTypes from './contactsTypes';

const initialState = {
  emailData:[],
  apiData:[]
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case contactsTypes.SET_CONTACTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default contactsReducer;
