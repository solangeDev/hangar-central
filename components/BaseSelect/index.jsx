import React from 'react';
import styles from './index.module.scss';
import Select from '@material-ui/core/Select';

export default function BaseSelect(props) {
  let className = styles.MuiInputRoot;

  if (
    props.properties !== undefined &&
    props.properties.className !== undefined
  ) {
    className = styles[`${props.properties.className}`];
  }
  const handleChange = e => {
    console.log(e);
  };
  return (
    <Select
      onChange={props.onChange}
      className={className}
      labelId="label"
      id="select"
      value={props.value}>
      {props.children}
    </Select>
  );
}
