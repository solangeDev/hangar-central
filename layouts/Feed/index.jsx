import React, { useState, useEffect } from 'react';

import styles from './index.module.scss';
import withLocale from '../../hocs/withLocale';
import useTranslation from '../../hooks/useTranslation';
import { LocaleContext } from '../../context/LocaleContext';
import Link from 'next/link';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import CardProfile from '../../components/CardProfile';
import MenuFeed from '../../components/MenuFeed';
import CardFeed from '../../components/CardFeed';
import Footer from '../../components/FooterFeed';

function FeedLayout(props) {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();
  const [wrapperFixed, setWrapperFixed] = useState(false);

  const [wrapperCard1, setWrapperCard1] = useState({
    title: t('Feed.followersCard'),
    link: t('Feed.followersCardMore'),
    items: [
      {
        id: 1,
        name: 'Copa Airlines',
        icon: 'icon-seguir',
        description: `277.419 ${t('Feed.followers')}`,
        show: true,
      },
      {
        id: 2,
        name: 'Copa Airlines',
        icon: 'icon-seguir',
        description: `277.419 ${t('Feed.followers')}`,
        show: true,
      },
      {
        id: 3,
        name: 'Copa Airlines',
        icon: 'icon-seguir',
        description: `277.419 ${t('Feed.followers')}`,
        show: true,
      },
      {
        id: 4,
        name: 'Copa Airlines',
        icon: 'icon-seguir',
        description: `277.419 ${t('Feed.followers')}`,
        show: true,
      },
      {
        id: 5,
        name: 'Copa Airlines',
        icon: 'icon-seguir',
        description: `277.419 ${t('Feed.followers')}`,
        show: true,
      },
    ],
  });

  const [wrapperCard2, setWrapperCard2] = useState({
    title: t('Feed.UsersCard'),
    link: t('Feed.UsersCardMore'),
    items: [
      {
        id: 6,
        name: 'Copa Airlines',
        icon: 'icon-conectar',
        description: `277.419 ${t('Feed.followers')}`,
        show: true,
      },
      {
        id: 7,
        name: 'Copa Airlines',
        icon: 'icon-conectar',
        description: `277.419 ${t('Feed.followers')}`,
        show: true,
      },
    ],
  });

  const handleScroll = event => {
    let elmnt = document.getElementById('logo').scrollHeight + 42;
    let elmnt2 = document.getElementById('cardProfile').scrollHeight + 50;
    let scrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
    if (scrollTop >= elmnt + elmnt2) {
      setWrapperFixed(true);
    } else {
      setWrapperFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  let wrapperLogo = (
    <div id="logo" className={styles.Feed__logoWrapper}>
      <Link href={`/${locale}`}>
        <img
          className={styles.Feed__logo}
          src="/assets/images/logo.svg"
          alt="Logo"
        />
      </Link>
    </div>
  );
  if (wrapperFixed) {
    wrapperLogo = (
      <div id="logo" className={styles.Feed__logoWrapperFixed}>
        <AnimatedOnScroll animationIn="slideInDown" animationInDuration={800}>
          <div className={styles.Feed__logoWrapper}>
            <Link href={`/${locale}`}>
              <img
                className={styles.Feed__logo}
                src="/assets/images/logo.svg"
                alt="Logo"
              />
            </Link>
          </div>
        </AnimatedOnScroll>
      </div>
    );
  }

  return (
    <section className={`${styles.Feed__container}`}>
      <section className={styles.Feed__wrapperCards}>
        {wrapperLogo}
        <article
          id="cardProfile"
          className={
            wrapperFixed
              ? styles.Feed__cardProfileHide
              : styles.Feed__cardProfile
          }>
          <CardProfile
            setUser={props.setUser}
            user={props.session}></CardProfile>
        </article>
        <article
          className={
            wrapperFixed
              ? styles.Feed__wrapperFixedMenu
              : styles.Feed__borderMenu
          }>
          <MenuFeed></MenuFeed>
        </article>
      </section>
      <section className={styles.Feed__wrapperFeed}>
        <div className={styles.Feed__containerPosts}></div>
      </section>
      <section className={styles.Feed__wrapperCards}>
        <article
          className={
            wrapperFixed
              ? styles.Feed__cardProfileHide
              : styles.Fedd__cardProfile
          }>
          <CardFeed properties={wrapperCard1}></CardFeed>
        </article>
        <article
          className={
            wrapperFixed ? styles.Feed__wrapperFixed : styles.Feed__borderMenu
          }>
          <div>
            <CardFeed properties={wrapperCard2}></CardFeed>
          </div>
          <footer className={styles.Feed__borderMenu}>
            <Footer></Footer>
          </footer>
        </article>
      </section>
    </section>
  );
}

export default FeedLayout;
