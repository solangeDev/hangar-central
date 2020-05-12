import * as yup from 'yup';
import { regexPasswordValidate } from '../../constants';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('formValidate.emailFormatInput')
    .required('formValidate.requiredInput'),
  password: yup
    .string()
    .required('formValidate.requiredInput')
    .matches(
      regexPasswordValidate,
      'formValidate.passwordFormatInput'
    ),
});

async function validateInputs(data, locale) {
  let form = {};
  let label = {};
  for (let item of data) {
    form[item.name] = item.value;
    if (item.label !== '') {
      label[item.name] = item.path;
    }
  }
  let respond = {
    result: false,
    data: [],
  };
  await schema
    .validate(form, { abortEarly: false })
    .then(valid => {
      respond.result = false;
    })
    .catch(err => {
      respond.result = true;
      for (let input of err.inner) {
        input.label = label[input.path];
        respond.data.push({
          input: input.path,
          message: input.message,
        });
      }
    });
  return respond;
}
export function validate(data, locale) {
  let response = validateInputs(data, locale);
  return response;
}
