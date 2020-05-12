import React from 'react';
import Router from 'next/router';
import styles from './index.module.scss';
import { LocaleContext } from '../../context/LocaleContext';
import Link from 'next/link';

function LoginLayout(props) {
  const { locale } = React.useContext(LocaleContext);
  const onClose = () => {
    const url =
      props.url !== undefined && props.url !== null
        ? `/${locale}/${props.url}`
        : `/${locale}`;
    Router.replace(`${url}`);
  };

  return (
    <div className={styles.authentication}>
      <header className={styles.authentication__header}>
        <div>
          <Link href={`/${locale}`}>
            <img
              className={styles.authentication__logoDesktop}
              src="/assets/images/logo.svg"
              alt="Logo"
            />
          </Link>
          <Link href={`/${locale}`}>
            <img
              className={styles.authentication__logoMobile}
              src="/assets/images/logo_mobile.svg"
              alt="Logo"
            />
          </Link>
        </div>
        <div
          onClick={onClose}
          className={
            !props.iconClose
              ? `${styles.authentication__linkBack} ${styles.authentication__hide}`
              : `${styles.authentication__linkBack}`
          }>
          <i className="icon-close"></i>
        </div>
      </header>
      <div className={styles.authentication__wrapper}>
        <div className={styles.authentication__backgroundLogin}></div>
        <div className={styles.authentication__authContainer}>
          <section>{props.children}</section>
        </div>
      </div>
    </div>
  );
}

export default LoginLayout;
