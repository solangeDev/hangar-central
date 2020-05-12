import React from 'react';

import styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';

function BaseInput(props) {
  return (
    <TextField
      key={props.properties.id}
      inputProps={{
        maxLength:
          props.properties.maxlength !== undefined
            ? props.properties.maxlength
            : '',
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
export default BaseInput;
