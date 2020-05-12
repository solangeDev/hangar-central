import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from './index.module.scss';
import useTranslation from '../../hooks/useTranslation';
import BaseButton from '../BaseButton';
import BaseInput from '../BaseInput';
import BaseInputPassword from '../BaseInputPassword';
import { validate } from './validate';
import NotificationAlert from '../../components/NotificationAlert';
import { changePassword } from '../../services/user';
import { LocaleContext } from '../../context/LocaleContext';
import Router from 'next/router';

function ChangePassword(props) {
  useEffect(() => {});
  const router = useRouter();
  const minLengthPassword = 8;
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();
  const [notificationAlert, setNotificationAlert] = useState({
    description: '',
    isShow: false,
  });
  const handleClickCloseNotification = () => {
    setNotificationAlert({
      ...notificationAlert,
      isShow: false,
      description: '',
    });
  };
  const setNotigication = (data, status) => {
    setNotificationAlert({
      ...notificationAlert,
      status: status,
      isShow: true,
      description: data,
    });
  };

  const [buttonSubmit, setButtonSubmit] = useState({
    disabled: true,
    className: 'btnBlue',
    title: t('changePassword.btn_label_ok'),
    type: 'submit',
    classHover: 'hvr-radial-out',
    loading: false,
  });
  const [state, setState] = useState({
    password: {
      status: false,
      props: {
        id: 'password',
        label: t('changePassword.password_label'),
        type: 'password',
        name: 'password',
        helperText: t('changePassword.error_password'),
        error: false,
        max_caracters: false,
        number: false,
        caracter_special: false,
        maxlength: 30,
      },
    },
    repeat_password: {
      status: false,
      props: {
        id: 'repeat_password',
        label: t('changePassword.repeat_password_label'),
        type: 'password',
        name: 'repeat_password',
        helperText: t('changePassword.error_password'),
        maxlength: 30,
      },
    },
  });
  const getFormData = formData => {
    let result = {};
    for (let data of formData) {
      if (data.name !== '') {
        result[data.name] = data.value;
      }
    }
    return result;
  };
  const handleSubmit = async e => {
    e.preventDefault();
    let formData = getFormData(e.target);
    let response = await validate(formData);
    clear(formData);
    if (response.result) {
      for (let result of response.data) {
        state[result.input].status = true;
        state[result.input].props.helperText = t(result.message);
      }
    } else {
      setButtonSubmit({ ...buttonSubmit, disabled: true, loading: true });
      sendData(formData);
    }

    setState({
      ...state,
    });
  };
  const clear = data => {
    for (let input in data) {
      state[input].status = false;
    }
  };

  const sendData = async data => {
    let navigatorName = getNavigator();
    let osName = getOS();
    let country = await getCountry();
    let respose = await changePassword({
      hash: router.query.hash,
      token: router.query.token,
      password: data.password,
      password_confirmation: data.repeat_password,
      locale: locale,
      osName: osName,
      navigatorName: navigatorName,
      country: country,
    });

    let responseData =
      (await respose.data) !== undefined ? respose.data : false;

    if (responseData === false) {
      setNotigication(t('server.error'), 'error');
    } else {
      if (responseData === false || responseData.code >= 300) {
        let message =
          responseData.message.password !== undefined
            ? responseData.message.password[0]
            : responseData.message;
        setNotigication(message, 'error');
      } else {
        props.setNotification({
          type: 'SET_NOTIFICATION',
          isShow: true,
          status: 'success',
          description: t('changePassword.notification_ok'),
        });
        Router.push('/[locale]/login', `/${locale}/login`, {
          shallow: true,
        });
      }
    }

    setButtonSubmit({ ...buttonSubmit, disabled: false, loading: false });
  };
  const validatePassword = value => {
    let copy = { ...state };
    copy.password.props.max_caracters = value.length >= minLengthPassword;
    copy.password.props.number = /[0-9]+/.test(value);
    copy.password.props.caracter_special = /[$@$!%*?&\.]+/.test(value);
    setState(copy);
  };
  const handleChange = e => {
    validatePassword(e.target.value);
    verifyEmail(e);
  };
  const getNavigator = () => {
    let sBrowser = '';
    let sUsrAg = navigator.userAgent;

    if (sUsrAg.indexOf('Firefox') > -1) {
      sBrowser = 'Firefox';
    } else if (sUsrAg.indexOf('SamsungBrowser') > -1) {
      sBrowser = 'Samsung Internet';
    } else if (sUsrAg.indexOf('Opera') > -1 || sUsrAg.indexOf('OPR') > -1) {
      sBrowser = 'Opera';
    } else if (sUsrAg.indexOf('Trident') > -1) {
      sBrowser = 'Internet Explorer';
    } else if (sUsrAg.indexOf('Edge') > -1) {
      sBrowser = 'Microsoft Edge';
    } else if (sUsrAg.indexOf('Chrome') > -1) {
      sBrowser = 'Google Chrome';
    } else if (sUsrAg.indexOf('Safari') > -1) {
      sBrowser = 'Safari';
    } else {
      sBrowser = 'unknown';
    }
    return sBrowser;
  };

  const getOS = () => {
    let oSName = 'Unknown';
    let sUsrAg = navigator.userAgent;
    if (sUsrAg.indexOf('Windows NT 10.0') != -1) {
      oSName = 'Windows 10';
    } else if (sUsrAg.indexOf('Windows NT 6.2') != -1) {
      oSName = 'Windows 8';
    } else if (sUsrAg.indexOf('Windows NT 6.1') != -1) {
      oSName = 'Windows 7';
    } else if (sUsrAg.indexOf('Windows NT 6.0') != -1) {
      oSName = 'Windows Vista';
    } else if (sUsrAg.indexOf('Windows NT 5.1') != -1) {
      oSName = 'Windows XP';
    } else if (sUsrAg.indexOf('Windows NT 5.0') != -1) {
      oSName = 'Windows 2000';
    } else if (sUsrAg.indexOf('Mac') != -1) {
      oSName = 'Mac/iOS';
    } else if (sUsrAg.indexOf('X11') != -1) {
      oSName = 'UNIX';
    } else if (sUsrAg.indexOf('Linux') != -1) {
      oSName = 'Linux';
    } else if (navigator.userAgent.indexOf('Android') != -1) {
      oSName = 'Android';
    }

    return oSName;
  };
  const getCountry = async () => {
    let dataCountry = await fetch('http://ip-api.com/json');
    let countryData = await dataCountry.json();

    return `${countryData.city}, ${countryData.country}`;
  };

  const verifyEmail = e => {
    if (e.target.value.length > 0) {
      setButtonSubmit({ ...buttonSubmit, disabled: false, loading: false });
    } else {
      setButtonSubmit({ ...buttonSubmit, disabled: true });
    }
  };

  return (
    <div className={styles.changePassword}>
      <NotificationAlert
        onClickIconClose={handleClickCloseNotification}
        properties={notificationAlert}
      />
      <h2 className={styles.changePassword__title}>
        {t('changePassword.title')}
      </h2>
      <span className={styles.changePassword__subTitle}>
        {t('changePassword.subtitle')}
      </span>
      <form onSubmit={handleSubmit}>
        <div className={styles.changePassword__inputWidth}>
          <BaseInputPassword
            error={state.password.status}
            properties={state.password.props}
            onChange={handleChange}
          />
          <div className={styles.changePassword__validatePassword}>
            <span
              className={
                state.password.props.max_caracters
                  ? `${styles.changePassword__stepPasswordValid}`
                  : ''
              }>
              {t('stepRegister1.validate_caracters')}
            </span>
            <span
              className={
                state.password.props.caracter_special
                  ? `${styles.changePassword__stepPasswordValid}`
                  : ''
              }>
              {t('stepRegister1.validate_special')}
            </span>
            <span
              className={
                state.password.props.number
                  ? `${styles.changePassword__stepPasswordValid}`
                  : ''
              }>
              {t('stepRegister1.validate_number')}
            </span>
          </div>
        </div>
        <div className={styles.changePassword__inputWidth}>
          <BaseInputPassword
            error={state.repeat_password.status}
            properties={state.repeat_password.props}
          />
        </div>
        <div className={styles.changePassword__buttonContainer}>
          <BaseButton properties={buttonSubmit} />
        </div>
      </form>
    </div>
  );
}
export default ChangePassword;
