import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import BaseButton from '../../components/BaseButton';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { logout } from '../../services/user';
import { LocaleContext } from '../../context/LocaleContext';
import Router from 'next/router';
import useTranslation from '../../hooks/useTranslation';

export default function CardProfile(props) {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();
  const buttonProperties = {
    className: 'btnBlueSmall',
    title: t('CardProfile.button'),
    type: 'button',
    disabled: false,
    classHover: 'hvr-radial-out',
  };
  const user = props.user;
  let image = (
    <div className={styles.CardProfile__iconProfile}>
      <span className="icon-profile">
        <span className="path1"></span>
        <span className="path2"></span>
        <span className="path3"></span>
      </span>
    </div>
  );
  if (user.image_profile !== null && user.image_profile !== '') {
    image = (
      <div>
        <img
          className={styles.CardProfile__imageProfile}
          src={user.image_profile}></img>
      </div>
    );
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const [icon, setIcon] = useState({
    name: 'icon-menu',
  });
  const handleClickMenu = event => {
    if (event.currentTarget !== null) {
      setIcon({
        ...icon,
        name: 'icon-menu-active',
      });
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setIcon({
      ...icon,
      name: 'icon-menu',
    });
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleClickOption = async e => {
    setAnchorEl(null);
    props.setUser({ logout: true });
    Router.push('/[locale]/login', `/${locale}/login`, {
      shallow: true,
    });
    await logout({
      token: `Bearer ${user.access_token}`,
    })
      .then(function(response) {
        setIcon({
          ...icon,
          name: 'icon-menu',
        });
        const data = response.data;
        if (data.success) {
          props.setUser({ logout: true });
          Router.push('/[locale]/login', `/${locale}/login`, {
            shallow: true,
          });
        } else {
          console.log(data, 'error');
        }
      })
      .catch(function(error) {
        console.log(error, 'logout');
      });
  };

  useEffect(() => {});

  return (
    <div className={styles.CardProfile}>
      <div className={styles.CardProfile__container}>
        <nav onClick={handleClickMenu} className={styles.CardProfile__menu}>
          <span className={icon.name}> </span>
        </nav>
        <Popover
          classes={{
            root: styles.CardProfile__root,
          }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          <Typography component={'span'} variant={'body2'}>
            <div className={styles.CardProfile__optionMenu}>
              <div className={styles.CardProfile__iconMenu}>
                <i className="icon-logout"> </i>
              </div>
              <div
                onClick={handleClickOption}
                className={styles.CardProfile__optionMenuText}>
                {t('CardProfile.option1')}
              </div>
            </div>
          </Typography>
        </Popover>
        {image}
        <div className={styles.CardProfile__text}>
          {`${user.first_name} ${user.last_name}`}
        </div>
        <div className={styles.CardProfile__description}>
          {user.country_name}
        </div>
        <div className={styles.CardProfile__wrapperButton}>
          <BaseButton properties={buttonProperties}> </BaseButton>
        </div>
        <div className={styles.CardProfile__border}></div>
        <div className={styles.CardProfile__addCompany}>
          <div className={styles.CardProfile__iconAddCompany}>
            <i className="icon-add-circle"></i>
          </div>
          <div className={styles.CardProfile__addTabCompany}>
            {t('CardProfile.addCompany')}
          </div>
        </div>
      </div>
    </div>
  );
}
