import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import esLocale from 'date-fns/locale/es';
import enLocale from 'date-fns/locale/en-US';

import styles from './index.module.scss';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiPickersToolbarText: {
      toolbarTxt: {
        fontFamily: 'Raleway-Regular !important',
      },
    },
    MuiPickersToolbarText: {
      toolbarTxt: {
        fontFamily: 'Raleway-Regular !important',
      },
    },
    MuiPickersYear: {
      yearSelected: {
        color: '#1d79be !important',
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#1d79be !important',
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        minWidth: '290px',
      },
    },
    MuiTypography: {
      body2: {
        fontFamily: 'Raleway-Regular',
        fontSize: '16px',
      },
      body1: {
        fontFamily: 'Raleway-Bold',
        fontSize: '16px',
        color: '#4a4a4a',
      },
      caption: {
        fontFamily: 'Raleway-Regular',
        fontSize: '16px',
        color: '#4a4a4a',
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: '#5ca9d5 !important',
        color: 'white !important',
      },
      day: {
        color: '#4a4a4a',
      },
      current: {
        color: '#1d79be !important',
      },
    },
    MuiFormControl: {
      root: {
        margin: '0 !important',
      },
    },
  },
});

function BaseInputDate(props) {
  const localeMap = {
    en: enLocale,
    es: esLocale,
  };

  let helperText = '';
  if (props.properties.error) {
    helperText = (
      <FormHelperText className={styles.BaseInput__error}>
        {props.properties.helperText}
      </FormHelperText>
    );
  }
  return (
    <FormControl className={styles.BaseInput}>
      <MuiPickersUtilsProvider
        locale={localeMap[props.locale]}
        utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <KeyboardDatePicker
            classes={{
              root: styles.BaseInput__root,
            }}
            name={props.properties.name}
            maxDate={(props.properties.maxDate)?props.properties.maxDate:null}
            className={styles.BaseInput__test}
            error={props.properties.error}
            variant="inline"
            format={props.properties.format}
            margin="normal"
            id={props.properties.id}
            label={props.properties.label}
            value={props.properties.value}
            onChange={props.onChange}
            minDateMessage={props.properties.minDateMessage}
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
      {helperText}
    </FormControl>
  );
}
export default BaseInputDate;
