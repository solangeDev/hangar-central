import React from 'react';

import styles from './index.module.scss';
export default function BaseButton(props) {
  let img = '';
  let city = '';
  if (props.data.src !== "") {
    img = (
      <div className={styles.card__wrapperImgCard}>
        <img className={styles.card__imgCard} src={props.data.src}></img>
      </div>
    );
  }
  if (props.data.city !== '') {
    city = <span className={styles.card__titleDesc2}>{props.data.city}</span>;
  }
  if (props.data.banner) {
    return (
      <article className={styles.card__card}>
        {img}
      </article>
    )
  } else {
    return (
      <article className={styles.card__card}>
        <header className={styles.card__headerCard}>
          <div className={styles.card__logoCard}></div>
          <div className={styles.card__titleWrapper}>
            <h3 className={styles.card__titleCard}>{props.data.title}</h3>
            <span className={styles.card__titleDesc}>{props.data.subtitle}</span>
          </div>
        </header>
        <div className={styles.card__titleWrapper2}>
          <span className={styles.card__titleCard}>{props.data.title_description}</span>
          {city}
        </div>
        <p className={styles.card__parrafoCard}>{props.data.description}</p>
        {img}
      </article>
    );
  }
}
