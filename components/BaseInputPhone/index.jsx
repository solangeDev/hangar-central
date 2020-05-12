import React, { useEffect } from 'react';

import styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import { IconButton, InputAdornment } from '@material-ui/core';

function BaseInputPhone(props) {
  let phoneCode = null;
  if (
    props.properties.phoneCode !== null &&
    props.properties.phoneCode !== ''
  ) {
    phoneCode = (
      <InputAdornment position="start">
        <span
          className={
            styles.BaseInput__phoneCode
          }>{`+${props.properties.phoneCode}`}</span>
      </InputAdornment>
    );
  }

  return (
    <TextField
      disabled={props.properties.disabled}
      key={props.properties.id}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton disableRipple={true}>
              <span className={props.properties.icon}></span>
            </IconButton>
          </InputAdornment>
        ),
        startAdornment: phoneCode,
      }}
      inputProps={{
        maxLength: props.properties.maxlength,
      }}
      value={props.properties.value}
      helperText={props.error ? props.properties.helperText : ''}
      fullWidth
      error={props.properties.error}
      name={props.properties.name}
      onChange={props.onChange}
      onKeyUp={props.onKeyUp}
      onKeyPress={props.onKeyPress}
      type={props.properties.type}
      id={props.properties.id}
      label={props.properties.label}
      classes={{
        root:
          props.properties.className !== undefined
            ? styles[props.properties.className]
            : styles.BaseInput__root,
      }}></TextField>
  );
}
export default BaseInputPhone;
