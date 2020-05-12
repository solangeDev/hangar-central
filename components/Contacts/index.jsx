import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import useTranslation from '../../hooks/useTranslation';
import { LocaleContext } from '../../context/LocaleContext';
import BaseCheckbox from '../BaseCheckbox';
import BaseButton from '../../components/BaseButton';
import Link from 'next/link';
import { importContacts } from '../../services/user';
import NotificationAlert from '../../components/NotificationAlert';
import Router from 'next/router';

function Contacts(props) {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();
  const mapContacts = contacts => {
    let contactEmailData = [];
    contactEmailData = contacts.map((contact, index) => {
      return {
        index: contact.user_id !== undefined ? contact.user_id : index,
        value: true,
        iconClass: 'iconGrey',
        image:
          contact.image_profile !== undefined
            ? contact.image_profile
            : contact.image,
        nameItem:
          contact.name !== undefined
            ? contact.name
            : `${contact.first_name} ${contact.last_name}`,
        email: contact.email,
        name: contact.email,
      };
    });
    return contactEmailData;
  };
  const usersToInvite = mapContacts(props.contacts.emailData);
  const usersHangar = mapContacts(props.contacts.apiData);
  const [contacts, setContacts] = useState({
    usersHangar: usersHangar,
    usersToInvite: usersToInvite,
  });

  const totalUsers =
    contacts.usersHangar.length + contacts.usersToInvite.length;

  const [usersSelected, setUsersSelected] = useState(totalUsers);

  const [buttonSubmit, setButtonSubmit] = useState({
    disabled: false,
    className: 'btnBlue',
    title: `${t('Contacts.button')} (${usersSelected})`,
    type: 'submit',
    classHover: 'hvr-radial-out',
    loading: false,
  });

  const [checkWithHangar, setCheckWithHangar] = useState({
    value: true,
    name: 'checkWithHangar',
    label: null,
    iconClass: 'iconGrey',
  });

  const [checkToInvite, setCheckToInvite] = useState({
    value: true,
    name: 'checkToInvite',
    label: null,
    iconClass: 'iconGrey',
  });

  const [notificationAlert, setNotificationAlert] = useState({
    description: false,
    isShow: false,
    status: '',
  });

  const handleOnClickIconClose = () => {
    setNotificationAlert({
      ...notificationAlert,
      isShow: false,
    });
  };

  useEffect(() => {
    let title = `${t('Contacts.button')} (${usersSelected})`;
    if (usersSelected === 0) {
      title = t('Contacts.button');
    }
    setButtonSubmit({
      ...buttonSubmit,
      disabled: !usersSelected > 0,
      title: title,
    });
  }, [usersSelected]);

  const handleChange = e => {
    let val = false;
    const name = e.target.name;
    switch (name) {
      case 'checkToInvite':
        val = !checkToInvite.value;
        setCheckToInvite({ ...checkToInvite, value: val });
        const checkAllInvites = contacts.usersToInvite.map(a => {
          let b = { ...a };
          b.value = val;
          return b;
        });
        let total = 0;
        if (val) {
          total = checkAllInvites.length;
        } else {
          total =
            Math.sign(usersSelected - checkAllInvites.length) === -1
              ? total
              : usersSelected - checkAllInvites.length;
        }
        setUsersSelected(total);
        setContacts({ ...contacts, usersToInvite: checkAllInvites });
        break;
      case 'checkWithHangar':
        val = !checkWithHangar.value;
        setCheckWithHangar({ ...checkWithHangar, value: val });
        const checkAllHangar = contacts.usersHangar.map(a => {
          let b = { ...a };
          b.value = val;
          return b;
        });
        setUsersSelected(total);
        setContacts({ ...contacts, usersHangar: checkAllHangar });
        break;
      default:
        return null;
    }
  };

  const handleChangeHangarUser = e => {
    const name = e.target.name;
    let value = true;
    const changeData = contacts.usersHangar.map(a => {
      let b = { ...a };
      if (a.email === name) {
        b.value = !a.value;
        value = b.value;
      }
      return b;
    });
    if (value) {
      setUsersSelected(usersSelected + 1);
    } else {
      setUsersSelected(usersSelected - 1);
    }
    setContacts({ ...contacts, usersHangar: changeData });
  };

  const handleChangeGuestUser = e => {
    const name = e.target.name;
    let value = true;
    const changeData = contacts.usersToInvite.map(a => {
      let b = { ...a };
      if (a.email === name) {
        b.value = !a.value;
        value = b.value;
      }
      return b;
    });
    if (value) {
      setUsersSelected(usersSelected + 1);
    } else {
      setUsersSelected(usersSelected - 1);
    }
    setContacts({ ...contacts, usersToInvite: changeData });
  };

  const handleSubmit = async () => {
    const usersToInvite = contacts.usersToInvite.filter(a => {
      if (a.value) {
        return a;
      }
    });
    await importContacts({
      locale: locale,
      token: `Bearer ${props.session.access_token}`,
      data: usersToInvite,
    })
      .then(function(response) {
        if (response.data.success) {
          setNotificationAlert({
            ...notificationAlert,
            status: 'success',
            isShow: true,
            description: response.data.message,
          });
          Router.replace('/[locale]/feed', `/${locale}/feed`, {
            shallow: true,
          });
          props.setContacts({
            emailData: [],
            apiData: [],
          });
        } else {
          console.log('no');
        }
      })
      .catch(function(error) {});
  };

  const mapContactsEmails = contacts => {
    let contactEmailData = [];
    contactEmailData = contacts.map((contact, index) => {
      return (
        <div key={index} className={styles.Contacts__cardTable}>
          <div className={styles.Contacts__cardImage}>
            <span className="icon-profile">
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
            </span>
          </div>
          <div className={styles.Contacts__cardDetail}>
            <div className={styles.Contacts__cardName}>{contact.nameItem}</div>
            <div className={styles.Contacts__cardEmail}>{contact.email}</div>
          </div>
          <div className={styles.Contacts__cardCheck}>
            <BaseCheckbox
              onChange={handleChangeGuestUser}
              properties={contact}></BaseCheckbox>
          </div>
        </div>
      );
    });
    return contactEmailData;
  };

  let headerHangar = (
    <header className={styles.Contacts__tableHeader}>
      <div className={styles.Contacts__showDesk}>
        {t('Contacts.titleTab1Desk')}
      </div>
      <div className={styles.Contacts__showMobile}>
        {t('Contacts.titleTab1Mob')}
      </div>
      <div className={styles.Contacts__rowChecbox}>
        <div className={styles.Contacts__showDesk}>
          {t('Contacts.selectAllDesk')} ({contacts.usersHangar.length})
        </div>
        <div className={styles.Contacts__showMobile}>
          {t('Contacts.selectAllMob')} ({contacts.usersHangar.length})
        </div>
        <div>
          <BaseCheckbox
            onChange={handleChange}
            properties={checkWithHangar}></BaseCheckbox>
        </div>
      </div>
    </header>
  );

  let headerToInvite = (
    <header className={styles.Contacts__tableHeader}>
      <div className={styles.Contacts__showDesk}>
        {t('Contacts.titleTab2Desk')}
      </div>
      <div className={styles.Contacts__showMobile}>
        {t('Contacts.titleTab2Mob')}
      </div>
      <div className={styles.Contacts__rowChecbox}>
        <div className={styles.Contacts__showDesk}>
          {t('Contacts.selectAllDesk')} ({contacts.usersToInvite.length})
        </div>
        <div className={styles.Contacts__showMobile}>
          {t('Contacts.selectAllMob')} ({contacts.usersToInvite.length})
        </div>
        <div>
          <BaseCheckbox
            onChange={handleChange}
            properties={checkToInvite}></BaseCheckbox>
        </div>
      </div>
    </header>
  );

  if (contacts.usersHangar.length === 0) {
    headerHangar = null;
  }

  if (contacts.usersToInvite.length === 0) {
    headerToInvite = null;
  }

  const redirectBack = () => {
    Router.replace('/[locale]/step-4', `/${locale}/step-4`, {
      shallow: true,
    });
  };

  return (
    <div className={styles.Contacts}>
      <NotificationAlert
        onClickIconClose={handleOnClickIconClose}
        properties={notificationAlert}></NotificationAlert>
      <section className={styles.Contacts__container}>
        <header className={styles.Contacts__header}>
          <div onClick={redirectBack} className={styles.Contacts__bulletBack}>
            <span className={`icon-back ${styles.Contacts__bulletBackIcon}`}>
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          </div>
          <h3
            className={`${styles.Contacts__showDesk} ${styles.Contacts__title}`}>
            {t('Contacts.titleDesk1')} {totalUsers} {t('Contacts.titleDesk2')}
          </h3>
          <h3
            className={`${styles.Contacts__showMobile} ${styles.Contacts__title}`}>
            {t('Contacts.titleMob1')}
            <span className={styles.Contacts__totalUsers}>
              {totalUsers} {t('Contacts.titleMob3')}
            </span>
            {t('Contacts.titleMob2')}
          </h3>
        </header>
        <div className={styles.Contacts__wrapper}>
          <div className={styles.Contacts__table}>
            {/* Users with Hangar */}
            <section>
              {headerHangar}
              <section className={styles.Contacts__tableContainer}>
                {contacts.usersHangar.map((a, index) => {
                  return (
                    <div key={index} className={styles.Contacts__cardTable}>
                      <div className={styles.Contacts__cardImage}>
                        <span className="icon-profile">
                          <span className="path1"></span>
                          <span className="path2"></span>
                          <span className="path3"></span>
                        </span>
                      </div>
                      <div className={styles.Contacts__cardDetail}>
                        <div className={styles.Contacts__cardName}>
                          {a.nameItem}
                        </div>
                        <div className={styles.Contacts__cardEmail}>
                          {a.email}
                        </div>
                      </div>
                      <div className={styles.Contacts__cardCheck}>
                        <BaseCheckbox
                          onChange={handleChangeHangarUser}
                          properties={a}></BaseCheckbox>
                      </div>
                    </div>
                  );
                })}
              </section>
            </section>
            {/* Users To Invite */}
            <section>
              {headerToInvite}
              <section className={styles.Contacts__tableContainer}>
                {mapContactsEmails(contacts.usersToInvite)}
              </section>
            </section>
          </div>
          <div className={styles.Contacts__wrapperButton}>
            <BaseButton
              onClick={handleSubmit}
              properties={buttonSubmit}></BaseButton>
          </div>
          <div className={styles.Contacts__wrapperNext}>
            <Link href={`/${locale}/feed`}>
              <a className={styles.Contacts__next}>{t('Contacts.skip')}</a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Contacts;
