import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('formValidate.requiredInput'),
  last_name: yup.string().required('formValidate.requiredInput'),
  gender: yup.string().required('formValidate.requiredInput'),
  country: yup.string().required('formValidate.requiredInput'),
  phone: yup.string().required('formValidate.requiredInput'),
  date: yup.string().required('formValidate.requiredInput'),
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
