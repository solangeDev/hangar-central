import React from 'react';

import styles from './index.module.scss';
import Icon from '@material-ui/core/Icon';

export default function NotificationAlert(props) {
  let isShowClass = (props.properties.isShow) ? styles.notificationAlert__show : styles.notificationAlert__hidden;
  let statusMessage = (props.properties.status == "error") ? styles.notificationAlert__error : styles.notificationAlert__success;

  return (
    <section className={`${styles.notificationAlert} ${isShowClass} ${statusMessage}` }>
      <span className={styles.notificationAlert__message}>
        {props.properties.description}
      </span>
      <div onClick={props.onClickIconClose} className={styles.notificationAlert__iconClose}>
        <i className={`icon-close`}></i>
      </div>
    </section>
  );
}
