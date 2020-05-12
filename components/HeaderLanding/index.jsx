import React from 'react';
import Router from 'next/router';

import styles from './index.module.scss';
import BaseButton from '../BaseButton';
import withLocale from '../../hocs/withLocale';
import useTranslation from '../../hooks/useTranslation';
import { LocaleContext } from '../../context/LocaleContext';

export default function HeaderLanding() {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();
  let buttonRegister = {
    className: 'btnTransparent',
    title: t('headerLanding.btn_register'),
    type: 'button',
    classHover: '',
  };

  let buttonSession = {
    className: 'btnBorderTransparent',
    title: t('headerLanding.btn_session'),
    type: 'button',
    classHover: 'hvr-radial-out',
  };

  const redirectRegister = e => {
    e.preventDefault();
    Router.replace('/[locale]/register', `/${locale}/register`, {
      shallow: true,
    });
  };

  const redirectLogin = e => {
    e.preventDefault();
    Router.replace('/[locale]/login', `/${locale}/login`, { shallow: true });
  };

  return (
    <header className={styles.headerLanding}>
      <nav className={styles.headerLanding__container}>
        <img
          className={styles.headerLanding__logo}
          src="/assets/images/logo.svg"
        />
        <div className={styles.headerLanding__wrapperButton}>
          <div className={styles.headerLanding__buttonRegister}>
            <BaseButton
              onClick={redirectRegister}
              properties={buttonRegister}></BaseButton>
          </div>
          <div className={styles.headerLanding__buttonSession}>
            <BaseButton
              onClick={redirectLogin}
              properties={buttonSession}></BaseButton>
          </div>
        </div>
      </nav>
    </header>
  );
}
