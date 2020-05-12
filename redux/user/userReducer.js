import userTypes from './userTypes';

const initialState = {
  first_name: '',
  last_name: '',
  image_profile: '',
  image_background: '',
  slug: '',
  token_type: '',
  expires_in: '',
  access_token: '',
  refresh_token: '',
  email: '',
  locale: '',
  phone: '',
  country_id: '',
  country_name: '',
  birth_date: '',
  logout: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SET_USER:
      return { ...state, ...action.payload };
    case userTypes.CLEAN_USER:
      return {
        ...state,
        first_name: '',
        last_name: '',
        image_profile: '',
        image_background: '',
        slug: '',
        token_type: '',
        expires_in: '',
        access_token: '',
        refresh_token: '',
        email: '',
        locale: '',
        phone: '',
        country_id: '',
        country_name: '',
        birth_date: '',
        logout: false,
      };
    default:
      return state;
  }
};

export default userReducer;
