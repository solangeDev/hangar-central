import React, { Component } from 'react';
import * as yup from 'yup';

const schema = yup.object().shape({
  repeat_password: yup
    .string()
    .required('changePassword.notification_password_required')
    .oneOf(
      [yup.ref('password'), null],
      'changePassword.notification_password_not_match'
    )
    .matches(
      /^.*(?=.*[0-9])(?=.*[!$#%@-_.]).*$/,
      'changePassword.notification_password_required'
    ),
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
