import contactsTypes from './contactsTypes';

//Action Creator
export const setContacts = data => ({
  type: contactsTypes.SET_CONTACTS,
  payload: data,
});
