import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import useTranslation from '../../hooks/useTranslation';
import { LocaleContext } from '../../context/LocaleContext';
import LocaleSwitcher from '../LocaleSwitcher';
import BaseSelect from '../BaseSelect';
import MenuItem from '@material-ui/core/MenuItem';

export default function FeedMenu(props) {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();
  const baseSelect = {
    className: 'MuiInputRootGrey',
  };
  useEffect(() => {});
  return (
    <div className={styles.Footer}>
      <div className={styles.Footer__container}>
        <section className={styles.Footer__padding}>
          <LocaleSwitcher properties={baseSelect}></LocaleSwitcher>
          <a href="#" className={styles.Footer__link}>
            {t('footerLanding.about_us')}
          </a>
        </section>
        <section>
          <BaseSelect properties={baseSelect} value={'1'}>
            <MenuItem value={'1'}>{t('footerLanding.aboutUsMore')}</MenuItem>
          </BaseSelect>
        </section>
        <section className={styles.Footer__redes}>
          <a
            target="_blank"
            href="https://www.linkedin.com/company/hangarcentral">
            <i className={`icon-linkedin ${styles.Footer__icon}`}></i>
          </a>
          <a target="_blank" href="https://www.facebook.com/hangarcentral">
            <i className={`icon-facebook ${styles.Footer__icon}`}></i>
          </a>
          <a target="_blank" href="https://twitter.com/Hangar_Central">
            <i className={`icon-twitter  ${styles.Footer__icon}`}></i>
          </a>
          <a target="_blank" href="https://www.instagram.com/hangar_central/">
            <i className={`icon-instagram ${styles.Footer__icon}`}></i>
          </a>
        </section>
      </div>
      <section className={styles.Footer__reserved}>
        Hangar Central © 2020 All Rights Reserved.
      </section>
    </div>
  );
}
