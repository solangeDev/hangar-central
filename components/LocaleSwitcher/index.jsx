import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { locales, languageNames } from '../../translations/config';
import { LocaleContext } from '../../context/LocaleContext';
import styles from './index.module.scss';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import BaseSelect from '../BaseSelect';
import MenuItem from '@material-ui/core/MenuItem';

function LocaleSwitcher(props) {
  const { locale } = React.useContext(LocaleContext);
  const router = useRouter();
  const className =
    props.properties !== undefined && props.properties.className !== undefined
      ? props.properties.className
      : 'MuiInputRoot';
  const classNameChield =
    className === 'MuiInputRootGrey' ? 'MenuItemRootGrey' : 'MenuItemRoot';

  const handleLocaleChange = React.useCallback(
    e => {
      const regex = new RegExp(`^/(${locales.join('|')})`);
      router.push(
        router.pathname,
        router.asPath.replace(regex, `/${e.target.value}`)
      );
    },
    [router]
  );

  const BootstrapInput = withStyles(theme => ({
    input: styles.dropdown,
  }))(InputBase);

  const getIcon = locale => {
    let icon = '';
    let name = '';
    switch (locale) {
      case 'en':
        name = 'English';
        icon = (
          <div className={styles.dropdown__wrapperItem}>
            <span className={styles.dropdown__item}>{locale}</span>
            <span className="icon-en">
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
              <span className="path4"></span>
              <span className="path5"></span>
              <span className="path6"></span>
              <span className="path7"></span>
              <span className="path8"></span>
              <span className="path9"></span>
              <span className="path10"></span>
              <span className="path11"></span>
              <span className="path12"></span>
              <span className="path13"></span>
              <span className="path14"></span>
              <span className="path15"></span>
              <span className="path16"></span>
              <span className="path17"></span>
              <span className="path18"></span>
              <span className="path19"></span>
            </span>
          </div>
        );
        break;
      default:
        name = 'Español';
        icon = (
          <div className={styles.dropdown__wrapperItem}>
            <span className={styles.dropdown__item}>{locale}</span>
            <span className="icon-es">
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
              <span className="path4"></span>
              <span className="path5"></span>
              <span className="path6"></span>
              <span className="path7"></span>
              <span className="path8"></span>
              <span className="path9"></span>
              <span className="path10"></span>
            </span>
          </div>
        );
        break;
    }
    return name;
  };

  return (
    <BaseSelect
      properties={{ className: className }}
      onChange={handleLocaleChange}
      value={locale}>
      {locales.map(locale => (
        <MenuItem
          className={styles[`${classNameChield}`]}
          key={locale}
          value={locale}>
          {getIcon(locale)}
        </MenuItem>
      ))}
    </BaseSelect>
  );
}
export default LocaleSwitcher;
