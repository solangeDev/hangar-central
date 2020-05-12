import { URL } from './constans';
import useAxios from '../config/axios.config';

export async function listCountries(payload) {
  const formData = createFormData(payload);
  const AXIOS = useAxios(payload);
  return AXIOS.get(`${URL.LIST_COUNTRIES}`)
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
