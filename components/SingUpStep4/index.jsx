import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styles from './index.module.scss';
import useTranslation from '../../hooks/useTranslation';
import { LocaleContext } from '../../context/LocaleContext';
import BaseButton from '../BaseButton';
import BaseInput from '../BaseInput';
import { validate } from './validate';
import Link from 'next/link';
import GoogleContacts from 'react-google-contacts';
import { getInvitations } from '../../services/user';
import NotificationAlert from '../../components/NotificationAlert';
import MicrosoftLogin from 'react-microsoft-login';
import YahooApi from '../../components/YahooApi';

function SingUpStep4(props) {
  useEffect(() => {});
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
  const [formInput, formInputState] = useState({
    email: {
      status: false,
      props: {
        id: 'email',
        label: t('stepRegister4.inputlabel'),
        type: 'text',
        name: 'email',
        helperText: t('forgotPassword.error_email'),
        value: props.session.email,
      },
    },
  });
  const [buttonSubmit, setButtonSubmit] = useState({
    disabled: true,
    className: 'btnBlue',
    title: t('stepRegister4.button'),
    type: 'submit',
    classHover: 'hvr-radial-out',
    loading: false,
  });
  const verifyEmail = e => {
    if (e.target.value.length > 0) {
      setButtonSubmit({ ...buttonSubmit, disabled: false, loading: false });
    } else {
      setButtonSubmit({ ...buttonSubmit, disabled: true });
    }
  };
  const responseCallback = e => {
    if (e.error == undefined) {
      let contactsEmail = [];
      let contactToApi = [];
      for (let contact of e) {
        contactsEmail.push({
          name: contact.title,
          email: contact.email,
          image: '',
        });
        contactToApi.push(contact.email);
      }
      getInvitationsData(contactsEmail, contactToApi);
    }
  };
  const getInvitationsData = async (contactsEmail, contactToApi) => {
    let apiData = [];
    let respose = await getInvitations({
      data: contactToApi,
      locale: locale,
      token: `Bearer ${props.session.access_token}`,
    });
    let responseData =
      (await respose.data) !== undefined ? respose.data : false;

    if (responseData === false) {
      setNotigication(t('server.error'), 'error');
    } else {
      if (
        responseData === false ||
        responseData.code >= 300 ||
        responseData.code === undefined
      ) {
        let message =
          responseData.message.password !== undefined
            ? responseData.message.password[0]
            : responseData.message;
        setNotigication(message, 'error');
      } else {
        for (let user of responseData.result) {
          apiData.push({
            user_id: user.user_id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            image: user.image_profile != null ? user.image_profile : '',
          });
          let email = user.email;
          let indexToRemove = contactsEmail.findIndex(contact => {
            return findUser(contact, email);
          });
          contactsEmail.splice(indexToRemove, 1);
        }
      }
    }
    props.setContacts({
      type: 'SET_CONTACTS',
      emailData: contactsEmail,
      apiData: apiData,
    });
    Router.push('/[locale]/contacts', `/${locale}/contacts`, {
      shallow: true,
    });
  };
  const findUser = (contact, email) => {
    return contact.email === email;
  };
  const openContactsApi = type => {
    if (type === 'gmail') {
      let googleBtn = document.querySelector('.googleBtn');
      googleBtn.click();
    } else if (type === 'outlook' || type === 'hotmail') {
      let outlookBtn = document.querySelector('.outlookBtn');
      console.log(outlookBtn);
    } else if (type == 'yahoo') {
      console.log('yahoo');
      yahooBtnClick();
    }
  };
  const authHandler = async (error, authData) => {
    let contactsEmail = [];

    if (error == null) {
      let responseData = await fetch(
        'https://graph.microsoft.com/v1.0/me/people/?$top=1000&$Select=displayName,scoredEmailAddresses',
        {
          headers: new Headers({
            Authorization:
              'Bearer ' + authData.authResponseWithAccessToken.accessToken,
          }),
        }
      );
      let response = await responseData.json();

      for (let contact of response.value) {
        if (contact.scoredEmailAddresses.length > 0) {
          contactsEmail.push({
            name: contact.displayName,
            email: contact.scoredEmailAddresses[0]['address'],
            image: '',
          });
        }
      }
      getInvitationsData(contactsEmail, contactsEmail);
    }
  };
  const authYahoo = async (authYahooData) => {
    if (authYahooData.getContacs) {
      getInvitationsData(authYahooData.data, authYahooData.data);
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();

    let formData = getFormData(e.target);
    let response = await validate(formData);
    formInput.email.status = false;

    if (response.result) {
      for (let result of response.data) {
        formInput.email.props.helperText = t(result.message);
        formInput.email.status = true;
      }
    } else {
      let emailDns = formData.email.split('@')[1].split('.')[0];
      if (emailDns === 'teravisiontech' || emailDns === 'somasoftware') {
        openContactsApi('gmail');
      } else if (
        emailDns === 'gmail' ||
        emailDns === 'hotmail' ||
        emailDns === 'outlook' ||
        emailDns === 'yahoo'
      ) {
        openContactsApi(emailDns);
      } else {
        console.log('no se puede');
      }
    }

    formInputState({
      ...formInput,
    });
  };
  const getFormData = formData => {
    let result = {};
    for (let data of formData) {
      if (data.name !== '') {
        result[data.name] = data.value;
      }
    }
    return result;
  };
  const setValue = input => {
    formInput.email.props.value = input.target.value;
    formInputState({
      ...formInput,
      formInput,
    });
    verifyEmail(input)
  };
  const yahooBtnClick = () => {
    document.querySelector('#yahooBtn').click();
  }
  return (
    <div className={styles.step4}>
      <NotificationAlert
        onClickIconClose={handleClickCloseNotification}
        properties={notificationAlert}
      />
      <header className={styles.step4__header}>
        <div>
          <span className={`icon-back ${styles.step4__bulletBackIcon}`}>
            <span className="path1"></span>
            <span className="path2"></span>
          </span>
        </div>
        <h3 className={styles.step4__header__title}>
          {t('stepRegister4.title')}
        </h3>
      </header>
      <form onSubmit={handleSubmit}>
        <section className={styles.step4__formContent}>
          <BaseInput
            error={formInput.email.status}
            properties={formInput.email.props}
            onChange={setValue}></BaseInput>
          <div className={styles.step4__formButtonContent}>
            <BaseButton properties={buttonSubmit} />
          </div>
          <div className={styles.step4__subtitle}>
            <span>{t('stepRegister4.subtitle')}</span>
          </div>
          <div className={styles.step4__hidden}>
            <GoogleContacts
              className="googleBtn"
              clientId="396024386575-nuglt5olds1ssfhifo9ctqob0qgqds1j.apps.googleusercontent.com"
              buttonText=""
              onSuccess={responseCallback}
              onFailure={responseCallback}
            /><YahooApi onChange={authYahoo}/>
          </div>
          <div className={styles.step4__socialsBtnContent}>
            <div
              onClick={() => {
                openContactsApi('gmail');
              }}>
              <img src="/assets/images/gmail_contact.svg" alt="" />
            </div>
            <div>
              <MicrosoftLogin
                graphScopes={['contacts.Read', 'user.read', 'People.Read']}
                children={
                  <img src="/assets/images/outlook_contact.svg" alt="" />
                }
                className="outlookBtn"
                clientId="fa40ec41-aed2-4df3-ab1e-ea355afc747b"
                authCallback={authHandler}
              />
            </div>
            <div onClick={() => {
                openContactsApi('yahoo');
              }}>
              <img src="/assets/images/yahoo_contact.svg" alt="" />
            </div>
          </div>
          <div className={styles.step4__next}>
            <Link href="/">
              <a href="">{t('stepRegister4.next')}</a>
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
}
export default SingUpStep4;
