import React, { useState, useEffect } from 'react';

import styles from './index.module.scss';
import BaseInput from '../BaseInput';
import BaseButton from '../../components/BaseButton';
import Router from 'next/router';
import useTranslation from '../../hooks/useTranslation';
import { LocaleContext } from '../../context/LocaleContext';
import { verifyCode } from '../../services/user';
import { verifyEmail } from '../../services/user';
import NotificationAlert from '../../components/NotificationAlert';

function Step2(props) {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();

  const [buttonSubmit, setButtonSubmit] = useState({
    disabled: true,
    className: 'btnBlue',
    title: t('stepRegister2.btn_submit'),
    type: 'submit',
    classHover: 'hvr-radial-out',
    loading: false,
  });

  const [formData, setFormData] = useState({
    pass1: {
      value: '',
      className: 'BaseInput__verifyCode',
      maxlength: 6,
      id: 'pass1',
      label: '',
      type: 'text',
      name: 'pass1',
    },
    pass2: {
      value: '',
      className: 'BaseInput__verifyCode',
      maxlength: 6,
      id: 'pass2',
      label: '',
      type: 'text',
      name: 'pass2',
    },
    pass3: {
      value: '',
      className: 'BaseInput__verifyCode',
      maxlength: 6,
      id: 'pass3',
      label: '',
      type: 'text',
      name: 'pass3',
    },
    pass4: {
      value: '',
      className: 'BaseInput__verifyCode',
      maxlength: 6,
      id: 'pass4',
      label: '',
      type: 'text',
      name: 'pass4',
    },
    pass5: {
      value: '',
      className: 'BaseInput__verifyCode',
      maxlength: 6,
      id: 'pass5',
      label: '',
      type: 'text',
      name: 'pass5',
    },
    pass6: {
      value: '',
      className: 'BaseInput__verifyCode',
      maxlength: 6,
      id: 'pass6',
      label: '',
      type: 'text',
      name: 'pass6',
    },
  });

  const [notificationAlert, setNotificationAlert] = useState({
    description: false,
    isShow: false,
    status: '',
  });

  const [errorForm, setErrorForm] = useState({
    error: false,
  });

  useEffect(() => {});

  const handleKeyUp = e => {
    if (e.keyCode === 8) {
      let input = e.target.id;
      input = input.split('pass');
      input = parseInt(input[1]) + 1;
      if (input >= 7) {
        input = 1;
      }
      document.getElementById(`pass${input}`).focus();
    }
  };

  const handleChange = e => {
    setButtonSubmit({ ...buttonSubmit, disabled: false });
    setErrorForm({ ...errorForm, error: false });
    const { value, name } = e.target;
    let namePass = name.split('pass');
    namePass = parseInt(namePass[1]);
    let state = { ...formData };
    if (value.length === 6) {
      let arrValue = value.split('');
      arrValue.forEach((a, i) => {
        let indice = i + 1;
        state[`pass${indice}`].value = a;
      });
      setFormData(state);
    } else {
      if (namePass < 6) {
        namePass++;
      } else if (namePass === 6) {
        namePass = 1;
      }
      state[name].value = value;
      if (value !== '') {
        state[name].maxlength = 1;
        document.getElementById(`pass${namePass}`).focus();
      } else {
        state[name].maxlength = 6;
        setButtonSubmit({ ...buttonSubmit, disabled: true });
      }
      setFormData(state);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const valid = Object.keys(formData).filter(a => {
      if (formData[a].value === '') {
        return a;
      }
    });
    if (valid.length > 0) {
      setErrorForm({ ...errorForm, error: true });
    } else {
      sendCode();
    }
  };

  const sendCode = async () => {
    setButtonSubmit({ ...buttonSubmit, disabled: true, loading: true });
    let code = '';
    Object.keys(formData).forEach(a => {
      code += formData[a].value;
    });
    code = code.trim();
    code = code.toUpperCase();
    if (props.email !== '' && props.password !== '') {
      let data = {
        email: props.email,
        code: code,
        locale: locale,
      };
      await verifyCode(data)
        .then(function(response) {
          const status = response.data.success;
          const message = response.data.message;
          if (status) {
            cleanForm();
            props.setRegister({
              email: props.email,
              password: props.password,
              validateCode: true,
            });
            Router.push('/[locale]/step-3', `/${locale}/step-3`, {
              shallow: true,
            });
          } else {
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
          console.error(error);
        });
    } else {
      setNotificationAlert({
        ...notificationAlert,
        status: 'error',
        isShow: true,
        description: t('stepRegister2.error'),
      });
      setButtonSubmit({ ...buttonSubmit, disabled: false, loading: false });
    }
  };

  const handleOnClickIconClose = () => {
    setNotificationAlert({
      ...notificationAlert,
      isShow: false,
    });
  };

  const cleanForm = () => {
    let state = { ...formData };
    Object.keys(state).forEach(a => {
      state[a].value = '';
    });
    setFormData(state);
    setButtonSubmit({ ...buttonSubmit, disabled: false });
  };

  const sendMailCode = async e => {
    e.preventDefault();
    if (props.email !== '' && props.password !== '') {
      let data = {
        email: props.email,
        password: props.password,
      };
      await verifyEmail(data)
        .then(function(response) {
          const data = response.data === undefined ? response : response.data;
          const status = data.success;
          if (status) {
            cleanForm();
            setNotificationAlert({
              ...notificationAlert,
              status: 'success',
              isShow: true,
              description: t('stepRegister1.success_message'),
            });
          } else {
            let message =
              data.message.email !== undefined
                ? data.message.email[0]
                : data.message;
            setNotificationAlert({
              ...notificationAlert,
              status: 'error',
              isShow: true,
              description: message,
            });
          }
        })
        .catch(function(error) {
          console.error(error);
        });
    } else {
      setNotificationAlert({
        ...notificationAlert,
        status: 'error',
        isShow: true,
        description: t('stepRegister2.error'),
      });
      setButtonSubmit({ ...buttonSubmit, disabled: false });
    }
  };

  return (
    <div>
      <NotificationAlert
        onClickIconClose={handleOnClickIconClose}
        properties={notificationAlert}></NotificationAlert>
      <form onSubmit={handleSubmit}>
        <section className={styles.step2Form__container}>
          <header>
            <h3 className={styles.step2Form__title}>
              {t('stepRegister2.title')}
            </h3>
            <article className={styles.step2Form__description}>
              {t('stepRegister2.subtitle')}
            </article>
          </header>
          <section className={styles.step2Form__wrapInputPass}>
            <div className={styles.step2Form__inputPass}>
              <BaseInput
                value={formData.pass1.value}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                properties={formData.pass1}></BaseInput>
            </div>
            <div className={styles.step2Form__inputPass}>
              <BaseInput
                value={formData.pass2.value}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                properties={formData.pass2}></BaseInput>
            </div>
            <div className={styles.step2Form__inputPass}>
              <BaseInput
                value={formData.pass3.value}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                properties={formData.pass3}></BaseInput>
            </div>
            <div className={styles.step2Form__inputPass}>
              <BaseInput
                value={formData.pass4.value}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                properties={formData.pass4}></BaseInput>
            </div>
            <div className={styles.step2Form__inputPass}>
              <BaseInput
                value={formData.pass5.value}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                properties={formData.pass5}></BaseInput>
            </div>
            <div className={styles.step2Form__inputPass}>
              <BaseInput
                value={formData.pass6.value}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                properties={formData.pass6}></BaseInput>
            </div>
          </section>
          <section
            className={
              errorForm.error
                ? `${styles.step2Form__errorMessage}`
                : `${styles.step2Form__hide}`
            }>
            <span>{t('stepRegister2.errorcode')}</span>
          </section>
          <div className={styles.step2Form__wrapperButton}>
            <BaseButton properties={buttonSubmit}></BaseButton>
          </div>
          <section className={styles.step2Form__sendCode}>
            <span>{t('stepRegister2.sendcode')}</span>
            <a href="#" onClick={sendMailCode}>
              {t('stepRegister2.hrefsendcode')}
            </a>
          </section>
        </section>
      </form>
    </div>
  );
}
export default Step2;
