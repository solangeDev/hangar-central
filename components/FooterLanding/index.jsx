import React from 'react';

import styles from './index.module.scss';
import LocaleSwitcher from '../LocaleSwitcher';
import BaseSelect from '../BaseSelect';

import withLocale from '../../hocs/withLocale';
import useTranslation from '../../hooks/useTranslation';
import MenuItem from '@material-ui/core/MenuItem';

export default function FooterLanding() {
  const { t } = useTranslation();
  return (
    <div className={styles.footer}>
      <section className={styles.footer__terms}>
        <LocaleSwitcher></LocaleSwitcher>
        <div className={styles.footer__termLinks}>
          <a href="#" className={styles.footer__link}>
            {t('footerLanding.about_us')}
          </a>
          <BaseSelect value={'1'}>
            <MenuItem className={styles.MenuItemRoot}>{t('footerLanding.link_terms')}</MenuItem>
            <MenuItem className={styles.MenuItemRoot}>{t('footerLanding.Privacy_policies')}</MenuItem>
            <MenuItem className={styles.MenuItemRoot}>{t('footerLanding.Cookies_policies')}</MenuItem>
            <MenuItem className={styles.MenuItemRoot}>{t('footerLanding.Copyright_policies')}</MenuItem>
            <MenuItem className={styles.MenuItemRoot}>{t('footerLanding.Copyright_claims')}</MenuItem>
            <MenuItem className={styles.MenuItemRoot}>{t('footerLanding.Drop out')}</MenuItem>
            <MenuItem className={styles.MenuItemRoot} value={'1'}>{t('footerLanding.aboutUsMore')}</MenuItem>
          </BaseSelect>
        </div>
      </section>
      <section className={styles.footer__redes}>
        <a target="_blank">
          <img src="/assets/images/email.svg" alt=""/>
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/company/hangarcentral">
          <i className={`icon-linkedin ${styles.footer__icon}`}></i>
        </a>
        <a target="_blank" href="https://www.facebook.com/hangarcentral">
          <i className={`icon-facebook ${styles.footer__icon}`}></i>
        </a>
        <a target="_blank" href="https://twitter.com/Hangar_Central">
          <i className={`icon-twitter ${styles.footer__icon}`}></i>
        </a>
        <a target="_blank" href="https://www.instagram.com/hangar_central/">
          <i className={`icon-instagram ${styles.footer__icon}`}></i>
        </a>
      </section>
    </div>
  );
}
