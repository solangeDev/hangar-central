import React from 'react';
import styles from './index.module.scss';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function BaseSelectNativo(props) {
  const theme = createMuiTheme({
    overrides: {
      MuiPopover: {
        paper: {
          //maxHeight: '95vh !important',
        },
      },
    },
  });

  let helperText = '';
  if (props.properties.error) {
    helperText = (
      <FormHelperText className={styles.BaseInput__error}>
        {props.properties.helperText}
      </FormHelperText>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <FormControl className={styles.select}>
        <InputLabel id={props.properties.idLabel}>
          {props.properties.label}
        </InputLabel>
        <Select
          classes={{ select: styles.select__selectRoot }}
          disabled={props.properties.disabled}
          name={props.properties.name}
          id={props.properties.id}
          value={props.properties.value}
          onChange={props.onChange}
          input={<Input />}
          MenuProps={{
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            MenuListProps: {
              disablePadding: true,
            },
          }}>
          {props.properties.options.map((a, index) => {
            return (
              <MenuItem
                key={index}
                className={styles.select__menuContainer}
                value={a.value}>
                <span>{a.text}</span>
              </MenuItem>
            );
          })}
        </Select>
        {helperText}
      </FormControl>
    </ThemeProvider>
  );
}
