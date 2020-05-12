import React, { useState, useEffect } from 'react';

import styles from './index.module.scss';
import BaseButton from '../BaseButton';
import BaseInput from '../BaseInput';
import useTranslation from '../../hooks/useTranslation';
import { validate } from './validate';
import { forgotPassword } from '../../services/user';
import NotificationAlert from '../../components/NotificationAlert';
import { LocaleContext } from '../../context/LocaleContext';
import { verify } from 'crypto';

function ForgotPassword() {
  useEffect(() => {});
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();
  const [notificationAlert, setNotificationAlert] = useState({
    description: '',
    isShow: false,
  });
  const [DisableResend, setDisableResend] = useState({
    disabled: true,
    resent: false,
  });
  const handleClickCloseNotification = () => {
    setNotificationAlert({
      ...notificationAlert,
      status: status,
      isShow: false,
      description: '',
    });
  };
  const [buttonSubmit, setButtonSubmit] = useState({
    disabled: true,
    className: 'btnBlue',
    title: t('forgotPassword.btn_label_ok'),
    type: 'submit',
    classHover: 'hvr-radial-out',
    loading: false,
  });

  const [state, setState] = useState({
    email: {
      status: false,
      props: {
        id: 'email',
        label: t('forgotPassword.email_input'),
        type: 'text',
        name: 'email',
        helperText: t('forgotPassword.error_email'),
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
  const setNotigication = (data, status) => {
    setNotificationAlert({
      ...notificationAlert,
      status: status,
      isShow: true,
      description: data,
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();

    let formData = getFormData(e.target);
    let response = await validate(formData);
    state.email.status = false;

    if (response.result) {
      for (let result of response.data) {
        state.email.props.helperText = t(result.message);
        state.email.status = true;
      }
    } else {
      setButtonSubmit({ ...buttonSubmit, disabled: true, loading: true });
      setDisableResend({
        disabled: true,
        loading: true,
      });
      sendData(formData);
    }

    setState({
      ...state,
    });
  };
  const sendData = async data => {
    let respose = await forgotPassword({
      email: data.email.toLowerCase(),
      locale: locale,
    });
    let responseData =
      (await respose.data) !== undefined ? respose.data : false;

    if (responseData === false) {
      setNotigication(t('server.error'), 'error');
    } else {
      if (responseData === false || responseData.code >= 300) {
        let message =
          responseData.message.email !== undefined
            ? responseData.message.email[0]
            : responseData.message;
        setNotigication(message, 'error');
        setDisableResend({
          disabled: true,
        });
      } else {
        if (DisableResend.resent) {
          setNotigication(t('forgotPassword.notification_resend'), 'success');
        } else {
          setNotigication(t('forgotPassword.notification_send'), 'success');
        }
        setDisableResend({
          view: false,
          resent: true,
        });
      }
    }

    setButtonSubmit({ ...buttonSubmit, disabled: false, loading: false });
  };
  const verifyEmail = e => {
    if (e.target.value.length > 0) {
      setButtonSubmit({ ...buttonSubmit, disabled: false, loading: false });
    } else {
      setButtonSubmit({ ...buttonSubmit, disabled: true });
    }
  };

  return (
    <div className={styles.forgotPassword}>
      <NotificationAlert
        onClickIconClose={handleClickCloseNotification}
        properties={notificationAlert}
      />
      <h2 className={styles.forgotPassword__title}>
        {t('forgotPassword.title')}
      </h2>
      <span className={styles.forgotPassword__subTitle}>
        {t('forgotPassword.subtitle')}
      </span>
      <form onSubmit={handleSubmit}>
        <div className={styles.forgotPassword__inputWidth}>
          <BaseInput
            onChange={verifyEmail}
            error={state.email.status}
            properties={state.email.props}
          />
        </div>
        <div className={styles.forgotPassword__buttonContainer}>
          <BaseButton properties={buttonSubmit} />
        </div>
        <div className={`${styles.forgotPassword__forgotPass}`}>
          {t('forgotPassword.resend_label')}
          <button disabled={DisableResend.disabled}>
            {t('forgotPassword.resend_link')}
          </button>
        </div>
      </form>
    </div>
  );
}
export default ForgotPassword;
