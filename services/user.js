import { URL } from './constans';
import useAxios from '../config/axios.config';

export async function verifyEmail(payload) {
  const formData = createFormData(payload);
  const AXIOS = useAxios(payload);
  return AXIOS.post(`${URL.VERIFY_EMAIL}`, formData)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

export async function forgotPassword(payload) {
  const formData = createFormData(payload);
  const AXIOS = useAxios(payload);
  return AXIOS.post(`${URL.FORGOT_PASSWORD}`, formData)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

export async function changePassword(payload) {
  const formData = createFormData(payload);
  const AXIOS = useAxios(payload);
  return AXIOS.post(`${URL.CHANGE_PASSWORD}`, formData)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

export async function verifyCode(payload) {
  const formData = createFormData(payload);
  const AXIOS = useAxios(payload);
  return AXIOS.post(`${URL.VERIFY_CODE}`, formData)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

export async function login(payload) {
  const formData = createFormData(payload);
  const AXIOS = useAxios(payload);
  return AXIOS.post(`${URL.LOGIN}`, formData)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

export async function createUser(payload) {
  const formData = createFormData(payload);
  const AXIOS = useAxios(payload);
  return AXIOS.post(`${URL.CREATE_USER}`, formData)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

export async function importContacts(payload) {
  payload.contentType = 'application/json';
  const AXIOS = useAxios(payload);
  return AXIOS.post(`${URL.IMPORT_CONTACTS}`, { data: payload.data })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

export async function logout(payload) {
  payload.contentType = 'application/json';
  const AXIOS = useAxios(payload);
  return AXIOS.post(`${URL.LOGOUT}`, {})
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}


export async function getInvitations(payload) {
  //const formData = createFormData(payload);
  const AXIOS = useAxios({locale: payload.locale, token: payload.token, contentType: 'application/json'});
  return AXIOS.get(`${URL.GET_INVITATIONS}`, {data: payload.data})
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

const createFormData = payload => {
  let formData = new FormData();
  formData.append('client_id', `${process.env.CLIENT_ID}`);
  formData.append('client_secret', `${process.env.CLIENT_SECRET}`);

  for (let x in payload) {
    formData.append(x, payload[x]);
  }

  return formData;
};
