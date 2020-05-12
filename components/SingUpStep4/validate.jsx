import React, { Component } from 'react';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string('forgotPassword.validation_required')
    .email('forgotPassword.validation_invalid_email')
    .required('forgotPassword.validation_required'),
});

async function validateInputs(data) {
  let respond = {
    result: false,
    data: [],
  };
  await schema
    .validate(data, { abortEarly: false })
    .then(valid => {
      respond.result = false;
    })
    .catch(err => {
      respond.result = true;
      for (let input of err.inner) {
        respond.data.push({
          input: input.path,
          message: input.message,
        });
      }
    });
  return respond;
}
export function validate(data) {
  let response = validateInputs(data);
  return response;
}
