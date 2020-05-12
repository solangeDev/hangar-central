import React from 'react';

import styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import { IconButton, InputAdornment } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import useTranslation from '../../hooks/useTranslation';
import { LocaleContext } from '../../context/LocaleContext';

function Seeker(props) {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();
  return (
    <FormControl className={styles.Seeker}>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                classes={{
                  root: styles.Seeker__button,
                }}
                disableRipple={true}>
                <span className="icon-search"></span>
              </IconButton>
            </InputAdornment>
          ),
        }}
        classes={{
          root: styles.Seeker__root,
        }}
        placeholder={t('Seeker.inputPlaceholder')}
        className={styles.Seeker__input}
        id="outlined-basic"
        label=""
        variant="outlined"
      />
      <div className={styles.Seeker__border}></div>
    </FormControl>
  );
}
export default Seeker;
