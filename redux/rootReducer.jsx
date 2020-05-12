import registerReducer from './register/registerReducer';
import userReducer from './user/userReducer';
import rememberMeReducer from './rememberMe/remeberMeReducer';
import notificationReducer from './notification/notificationReducer';
import contactsReducer from './contacts/contactsReducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [], //not persistent
};

const rootReducer = combineReducers({
  register: registerReducer,
  user: userReducer,
  rememberMe: rememberMeReducer,
  notification: notificationReducer,
  contacts: contactsReducer,
});

export default persistReducer(persistConfig, rootReducer);
