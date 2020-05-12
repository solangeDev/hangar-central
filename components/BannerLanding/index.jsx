import React from 'react';

import styles from './index.module.scss';

export default function BannerLanding(props) {
  return (
    // <aside className={styles.banner}>
    <img className={styles.banner__image} src={props.src}></img>
    // </aside>
  )
}
