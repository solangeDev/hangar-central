import React, { useState, useEffect } from 'react';

import styles from './index.module.scss';
import BaseInput from '../BaseInput';
import BaseInputPassword from '../BaseInputPassword';
import BaseCheckbox from '../BaseCheckbox';
import BaseButton from '../../components/BaseButton';
import Router from 'next/router';
import useTranslation from '../../hooks/useTranslation';
import { LocaleContext } from '../../context/LocaleContext';
import { validate } from './validate';
import { login } from '../../services/user';
import NotificationAlert from '../../components/NotificationAlert';

function Login(props) {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: {
      value: props.rememberMe ? props.rememberMe.email : '',
      id: 'email',
      label: 'Email',
      type: 'text',
      name: 'email',
      path: 'Email',
      error: false,
      helperText: '',
    },
    password: {
      value: props.rememberMe ? props.rememberMe.password : '',
      id: 'password',
      label: t('stepRegister1.label_password'),
      name: 'password',
      path: t('stepRegister1.label_password'),
      error: false,
      helperText: '',
      maxlength: 30,
    },
  });

  const [notificationAlert, setNotificationAlert] = useState({
    description: false,
    isShow: false,
    status: '',
  });

  const [buttonSubmit, setButtonSubmit] = useState({
    disabled: true,
    className: 'btnBlue',
    title: t('headerLanding.btn_session'),
    type: 'submit',
    classHover: 'hvr-radial-out',
    loading: false,
  });

  const [rememberMe, setrememberMe] = useState({
    value: props.rememberMe.rememberme,
    name: 'remeberme',
    label: t('login.rememberme_check'),
    className: 'Checkbox',
  });

  useEffect(() => {
    if (props.notification.isShow) {
      setNotificationAlert({
        description: props.notification.description,
        isShow: props.notification.isShow,
        status: props.notification.status,
      });
      props.notification.isShow = false;
      props.notification.description = '';
      props.notification.status = '';
    }
    if (formData.email.value === '') {
      setButtonSubmit({ ...buttonSubmit, disabled: true, loading: false });
    }
  }, [formData.email.value]);

  useEffect(() => {
    if (formData.password.value === '') {
      setButtonSubmit({ ...buttonSubmit, disabled: true, loading: false });
    }
  }, [formData.password.value]);

  useEffect(() => {
    if (props.rememberMe.rememberme === true) {
      setButtonSubmit({ ...buttonSubmit, disabled: false, loading: false });
    }
  }, [props.rememberMe]);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = getFormData(e.target);
    const response = await validate(form, locale);
    if (response.data.length > 0) {
      showErrorsForm(form, response);
    } else {
      await validateUser();
    }
  };

  const getFormData = form => {
    let result = [];
    for (let data of form) {
      let obj = {};
      let label = '';
      if (
        formData[data.name] !== undefined &&
        formData[data.name].path !== undefined
      ) {
        label = formData[data.name].path;
      }
      if (data.name !== '') {
        obj.name = data.name;
        obj.value = data.value;
        obj.path = label;
        result.push(obj);
      }
    }
    return result;
  };

  const validateUser = async e => {
    const email = formData.email.value.toLowerCase();
    setButtonSubmit({ ...buttonSubmit, disabled: true, loading: true });
    await login({
      username: email,
      password: formData.password.value,
      locale: locale,
    })
      .then(function(response) {
        const data = response.data === undefined ? response : response.data;
        const status = data.success;
        if (status) {
          props.setUser({
            first_name: data.result.user.first_name,
            last_name: data.result.user.last_name,
            image_profile: data.result.user.image_profile,
            image_background: data.result.user.image_background,
            slug: data.result.user.slug,
            phone: data.result.user.phone,
            token_type: data.result.token_type,
            expires_in: data.result.expires_in,
            access_token: data.result.access_token,
            refresh_token: data.result.refresh_token,
            email: data.result.user.email,
            country_id: null,
            country_name: data.result.user.country_name,
            birth_date: data.result.user.birth_date,
          });
          let stateRememberme = {};
          stateRememberme.rememberme = rememberMe.value;
          if (rememberMe.value) {
            stateRememberme.email = formData.email.value.toLowerCase();
            stateRememberme.password = formData.password.value;
          } else {
            stateRememberme.email = '';
            stateRememberme.password = '';
          }
          props.setRememberMe(stateRememberme);
          setNotificationAlert({
            ...notificationAlert,
            status: 'success',
            isShow: true,
            description: t('login.message_success'),
          });
          Router.push('/[locale]/feed', `/${locale}/feed`, {
            shallow: true,
          });
        } else {
          let message = '';
          let count = 0;
          if (typeof data.message === 'string') {
            message = data.message;
          } else {
            Object.keys(data.message).forEach(a => {
              count++;
              if (count === 1 && data.message[a].length > 0) {
                message = data.message[a][0];
              }
            });
          }
          setNotificationAlert({
            ...notificationAlert,
            status: 'error',
            isShow: true,
            description: message,
          });
        }
        setButtonSubmit({ ...buttonSubmit, disabled: false, loading: false });
      })
      .catch(function(error) {
        setButtonSubmit({ ...buttonSubmit, disabled: false, loading: false });
      });
  };

  const showErrorsForm = (form, response) => {
    let objForm = {};
    for (let data of form) {
      objForm[data.name] = data.value;
    }
    const paths = Object.keys(objForm);
    const errors = paths
      .map(a => {
        let count = 0;
        let c = {};
        const errors = response.data.filter(c => {
          if (c.input === a) {
            count++;
            if (count === 1) {
              return c;
            }
          }
        });
        c[a] = errors;
        return c;
      })
      .filter(a => {
        if (Object.values(a)[0].length > 0) {
          return a;
        }
      });
    errors.forEach(a => {
      let state = { ...formData };
      state[Object.keys(a)[0]].error = true;
      state[Object.keys(a)[0]].helperText = t(Object.values(a)[0][0].message);
      setFormData(state);
    });
  };

  const handleChange = e => {
    let { value, name } = e.target;
    let state = { ...formData };
    state[name].value = value;
    state[name].error = false;
    setFormData(state);
    setButtonSubmit({ ...buttonSubmit, disabled: false });
  };

  const handleChangeRememberMe = e => {
    if (e) {
      const value = rememberMe.value === false ? true : false;
      setrememberMe({ ...rememberMe, value: value });
    }
  };

  const handleOnClickIconClose = () => {
    setNotificationAlert({
      ...notificationAlert,
      isShow: false,
    });
  };

  const handleClickRegister = e => {
    e.preventDefault();
    Router.replace('/[locale]/register', `/${locale}/register`, {
      shallow: true,
    });
  };

  const handleClickForgot = e => {
    e.preventDefault();
    Router.replace('/[locale]/forgot-password', `/${locale}/forgot-password`, {
      shallow: true,
    });
  };

  return (
    <div>
      <NotificationAlert
        onClickIconClose={handleOnClickIconClose}
        properties={notificationAlert}></NotificationAlert>
      <div className={styles.Login__container}>
        <form onSubmit={handleSubmit}>
          <header>
            <h3 className={styles.Login__title}>{t('login.title')}</h3>
            <article className={styles.Login__description}>
              {t('login.subtitle')}
            </article>
          </header>
          <div className={styles.Login__row}>
            <BaseInput
              error={formData.email.error}
              value={formData.email.value}
              onChange={handleChange}
              properties={formData.email}></BaseInput>
          </div>
          <div className={styles.Login__rowBottom}>
            <BaseInputPassword
              error={formData.password.error}
              onChange={handleChange}
              value={formData.password.value}
              properties={formData.password}></BaseInputPassword>
          </div>
          <div className={styles.Login__rowRememberme}>
            <BaseCheckbox
              onChange={handleChangeRememberMe}
              properties={rememberMe}></BaseCheckbox>
          </div>
          <div className={styles.Login__rowRememberme}>
            <BaseButton properties={buttonSubmit}></BaseButton>
          </div>
          <div className={styles.Login__linkForgot}>
            <a
              href="#"
              onClick={handleClickForgot}
              className={styles.Login__link}>
              {t('login.forgotpassword_link')}
            </a>
          </div>
          <div className={styles.Login__linkRegister}>
            <span>{t('login.signup_description')}</span>
            <a
              href="#"
              onClick={handleClickRegister}
              className={styles.Login__link}>
              {t('login.signup_link')}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
