import React from 'react';

import styles from './index.module.scss';
import Button from '@material-ui/core/Button';
import PulseLoader from 'react-spinners/PulseLoader';

export default function BaseButton(props) {
  let nameClass = `${styles.baseButton} ${
    styles[`baseButton__${props.properties.type}`]
  }`;
  if (
    props.properties.classHover !== undefined &&
    props.properties.hover !== ''
  ) {
    nameClass += ` ${styles[`${props.properties.classHover}`]}`;
  }

  let title = props.properties.title;
  if (
    props.properties.loading !== undefined &&
    props.properties.loading === true
  ) {
    title = (
      <PulseLoader
        margin={6}
        size={10}
        color={'#fff'}
        loading={props.properties.loading}
      />
    );
  }

  return (
    <Button
      type={props.properties.type}
      classes={{
        root: styles[`baseButton__${props.properties.className}`],
      }}
      disabled={props.properties.disabled}
      onClick={props.onClick}
      className={nameClass}>
      {title}
    </Button>
  );
}
