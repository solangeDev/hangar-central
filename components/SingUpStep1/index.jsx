import React, { useState, useEffect } from 'react';

import styles from './index.module.scss';
import BaseInput from '../BaseInput';
import BaseButton from '../../components/BaseButton';
import Recaptcha from '../../components/Recaptcha';
import { verifyEmail } from '../../services/user';
import NotificationAlert from '../../components/NotificationAlert';
import BaseInputPassword from '../BaseInputPassword';
import { validate } from './validate';
import Router from 'next/router';
import useTranslation from '../../hooks/useTranslation';
import { LocaleContext } from '../../context/LocaleContext';
import { regexCaracterSpecial, minLengthPassword } from '../../constants';

function Register(props) {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();

  useEffect(() => {});

  /***** State *****/
  const [buttonSubmit, setButtonSubmit] = useState({
    disabled: true,
    className: 'btnBlue',
    title: t('stepRegister1.btn_submit'),
    type: 'submit',
    classHover: 'hvr-radial-out',
    loading: false,
  });

  const [formData, setFormData] = useState({
    email: {
      value: '',
      id: 'email',
      label: 'Email',
      type: 'text',
      name: 'email',
      path: 'Email',
      error: false,
      helperText: '',
    },
    password: {
      value: '',
      id: 'password',
      label: t('stepRegister1.label_password'),
      name: 'password',
      path: t('stepRegister1.label_password'),
      error: false,
      max_caracters: false,
      number: false,
      caracter_special: false,
      helperText: '',
      maxlength: 30,
    },
  });

  const [notificationAlert, setNotificationAlert] = useState({
    description: false,
    isShow: false,
    status: '',
  });

  /***** Events for the component *****/
  const handleChange = e => {
    let { value, name } = e.target;
    let state = { ...formData };
    state[name].value = value;
    state[name].error = false;
    setFormData(state);
    if (name === 'password') {
      validatePassword(value);
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

  const handleSubmit = async e => {
    e.preventDefault();
    const form = getFormData(e.target);
    const response = await validate(form, locale);
    if (response.data.length > 0) {
      showErrorsForm(form, response);
    } else {
      validateUser();
    }
  };

  const validateUser = async () => {
    const email = formData.email.value.toLowerCase();
    props.setRegister({
      email: email,
      password: formData.password.value,
    });
    setButtonSubmit({ ...buttonSubmit, disabled: true, loading: true });
    await verifyEmail({
      email: email,
      password: formData.password.value,
      locale: locale,
    })
      .then(function(response) {
        const data = response.data === undefined ? response : response.data;
        const status = data.success;
        if (status) {
          cleanForm();
          Router.push('/[locale]/step-2', `/${locale}/step-2`, {
            shallow: true,
          });
        } else {
          let count = 0;
          let message = data.message;
          Object.keys(data.message).forEach(a => {
            count++;
            if (count === 1 && data.message[a].length > 0) {
              message = data.message[a][0];
            }
          });
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

  const validatePassword = value => {
    let copy = { ...formData };
    copy.password.max_caracters = value.length >= minLengthPassword;
    copy.password.number = /[0-9]+/.test(value);
    copy.password.caracter_special = regexCaracterSpecial.test(value);
    setFormData(copy);
  };

  const cleanForm = () => {
    let state = { ...formData };
    state.password.max_caracters = false;
    state.password.caracter_special = false;
    state.password.number = false;
    state.password.value = '';
    state.email.value = '';
    setFormData(state);
    setButtonSubmit({ ...buttonSubmit, disabled: false });
  };

  const handleOnClickIconClose = () => {
    setNotificationAlert({
      ...notificationAlert,
      isShow: false,
    });
  };

  const redirectsingIn = e => {
    e.preventDefault();
    Router.push('/[locale]/login', `/${locale}/login`, {
      shallow: true,
    });
  };

  /***** Recapchat *****/
  const handleCapchat = () => {
    setButtonSubmit({ ...buttonSubmit, disabled: false });
  };

  const isExpiredCapchat = e => {
    if (e === undefined) {
      setButtonSubmit({ ...buttonSubmit, disabled: true });
    }
  };

  return (
    <div>
      <NotificationAlert
        onClickIconClose={handleOnClickIconClose}
        properties={notificationAlert}></NotificationAlert>
      <form onSubmit={handleSubmit}>
        <section className={styles.step1Form__container}>
          <header>
            <h3 className={styles.step1Form__title}>
              {t('stepRegister1.title')}
            </h3>
            <article className={styles.step1Form__description}>
              {t('stepRegister1.subtitle')}
            </article>
          </header>
          <div className={styles.step1Form__row}>
            <BaseInput
              error={formData.email.error}
              value={formData.email.value}
              onChange={handleChange}
              properties={formData.email}></BaseInput>
          </div>
          <div className={`${styles.step1Form__rowTopRecapchat}`}>
            <BaseInputPassword
              error={formData.password.error}
              onChange={handleChange}
              value={formData.password.value}
              properties={formData.password}></BaseInputPassword>
            <div className={styles.step1Form__validatePassword}>
              <span
                className={
                  formData.password.max_caracters
                    ? `${styles.step1Form__stepPasswordValid}`
                    : ''
                }>
                {t('stepRegister1.validate_caracters')}
              </span>
              <span
                className={
                  formData.password.caracter_special
                    ? `${styles.step1Form__stepPasswordValid}`
                    : ''
                }>
                {t('stepRegister1.validate_special')}
              </span>
              <span
                className={
                  formData.password.number
                    ? `${styles.step1Form__stepPasswordValid}`
                    : ''
                }>
                {t('stepRegister1.validate_number')}
              </span>
            </div>
          </div>
          <div className={styles.step1Form__wrapperRecapchat}>
            <Recaptcha
              isExpired={isExpiredCapchat}
              handleCapchat={handleCapchat}></Recaptcha>
          </div>
          <section className={styles.step1Form__terms}>
            <span>{t('stepRegister1.terms')}</span>
            <a href="#">{t('stepRegister1.href_terms')}</a>
          </section>
          <div>
            <BaseButton properties={buttonSubmit}></BaseButton>
          </div>
          <section className={styles.step1Form__singIn}>
            <span>{t('stepRegister1.login')}</span>
            <a href="#" onClick={redirectsingIn}>
              {t('stepRegister1.href_login')}
            </a>
          </section>
        </section>
      </form>
    </div>
  );
}
export default Register;
