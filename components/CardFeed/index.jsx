import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
export default function FeedCard(props) {
  return (
    <div className={styles.FeedCard}>
      <div className={styles.FeedCard__title}>{props.properties.title}</div>
      <div className={styles.FeedCard__container}>
        {props.properties.items.map((a, index) => {
          return (
            <div key={a.id} className={styles.FeedCard__item}>
              <div className={styles.FeedCard__image}></div>
              <div className={styles.FeedCard__wrapper}>
                <div className={styles.FeedCard__name}>Copa Airlines</div>
                <div className={styles.FeedCard__description}>
                  {a.description}
                </div>
              </div>
              <div className={styles.FeedCard__icon}>
                <i className={a.icon}></i>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.FeedCard__next}>
        <Link href={`#`}>
          <a>{props.properties.link}</a>
        </Link>
      </div>
    </div>
  );
}
