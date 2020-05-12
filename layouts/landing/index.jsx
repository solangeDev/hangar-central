import React, { useState, useEffect } from 'react';

import styles from './index.module.scss';
import HeaderLanding from '../../components/HeaderLanding';
import FooterLanding from '../../components/FooterLanding';
import BaseButton from '../../components/BaseButton';
import Card from '../../components/CardLanding';
import Banner from '../../components/BannerLanding';
import { Animated } from 'react-animated-css';
import Router from 'next/router';

import * as Scroll from 'react-scroll';
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from 'react-scroll';

import withLocale from '../../hocs/withLocale';
import useTranslation from '../../hooks/useTranslation';
import { LocaleContext } from '../../context/LocaleContext';

const scrollToTop = () => {
  scroll.scrollToTop();
};

function LandingLayout(props) {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();

  const buttonProperties = {
    className: 'btnBlue',
    title: t('landing.btn_register'),
    type: 'button',
    disabled: false,
    classHover: 'hvr-radial-out',
  };

  const buttonProperties2 = {
    className: 'btnBlue',
    title: t('landing.btn_joinus'),
    type: 'button',
    disabled: false,
    classHover: 'hvr-radial-out',
  };

  const dataCard = {
    src: '',
    title: 'Avianca',
    subtitle: 'hace 9 minutos. 138 solicitantes ',
    title_description: 'Ingeniero Aeronáutico',
    city: 'Caracas, Venezuela',
    description:
      'Buscamos ingenieros de Cálculo con experiencia en Diseño Estructural Aeronáutico con materiales compuestos y metál…',
  };

  const dataCardImage = {
    src: '/assets/images/banner_landing.png',
    title: 'Copa Airlines',
    subtitle: 'hace 9 minutos.',
    title_description:
      'Copa Airlines anuncia que viajeros pueden modificar sus...',
    city: '',
    description:
      'La industria del transporte aéreo moderno necesita ingenieros que tienen más de las habilidades técnicas.',
  };

  const dataBanner1 = {
    banner: true,
    image: '/assets/images/banner_landing.png',
  };

  const dataBanner2 = {
    banner: true,
    image: '/assets/images/banner_landing.png',
  };

  useEffect(() => {
    Events.scrollEvent.register('begin', function() {});
    Events.scrollEvent.register('end', function() {});
    scrollSpy.update();
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  });

  const redirectRegister = e => {
    e.preventDefault();
    Router.push('/[locale]/register', `/${locale}/register`,{ shallow: true });
  };

  return (
    <section className={styles.landing}>
      <section className={styles.landing__parallax}></section>
      <section className={styles.landing__container}>
        <HeaderLanding></HeaderLanding>
        <section className={styles.landing__register}>
          <article className={styles.landing__title}>
            <span>{t('landing.title')}</span>
            <span>{t('landing.title2')}</span>
          </article>
          <article className={styles.landing__subTitle}>
            {t('landing.subtitle')}
          </article>
          <section className={styles.landing__buttonRegister}>
            <BaseButton
              onClick={redirectRegister}
              properties={buttonProperties}></BaseButton>
          </section>
        </section>
        {/* 2th Section */}
        <section className={styles.landing__cards}>
          <article>
            <div className={`${styles.landing__marginCard}`}>
              <Animated
                animationIn="zoomIn"
                animationOut="zoomOut"
                animationInDuration={1000}
                animationOutDuration={1000}
                isVisible={true}>
                <Card data={dataCard}></Card>
              </Animated>
            </div>
            <div
              className={`${styles.landing__wrapperCard} ${styles.landing__marginCard}`}>
              <Animated
                animationIn="zoomIn"
                animationOut="zoomOut"
                animationInDuration={1000}
                animationOutDuration={1000}
                isVisible={true}>
                <Banner src="/assets/images/banner_landing.png"></Banner>
              </Animated>
            </div>
            <div
              className={`${styles.landing__wrapperCard} ${styles.landing__marginCard}`}>
              <Animated
                animationIn="zoomIn"
                animationOut="zoomOut"
                animationInDuration={1000}
                animationOutDuration={1000}
                isVisible={true}>
                <Card data={dataCard}></Card>
              </Animated>
            </div>
            <div
              className={`${styles.landing__wrapperCard} ${styles.landing__cardDesktop} ${styles.landing__marginCard}`}>
              <Animated
                animationIn="zoomIn"
                animationOut="zoomOut"
                animationInDuration={1000}
                animationOutDuration={1000}
                isVisible={true}>
                <Card data={dataCardImage}></Card>
              </Animated>
            </div>
          </article>
          <article className={styles.landing__paddingCard}>
            <div
              className={`${styles.landing__wrapperCard} ${styles.landing__cardMobile} ${styles.landing__marginCard}`}>
              <Animated
                animationIn="zoomIn"
                animationOut="zoomOut"
                animationInDuration={1000}
                animationOutDuration={1000}
                isVisible={true}>
                <Card data={dataCardImage}></Card>
              </Animated>
            </div>
            <div
              className={`${styles.landing__wrapperCard} ${styles.landing__cardMobile} ${styles.landing__marginCard}`}>
              <Animated
                animationIn="zoomIn"
                animationOut="zoomOut"
                animationInDuration={1000}
                animationOutDuration={1000}
                isVisible={true}>
                <Card data={dataCard}></Card>
              </Animated>
            </div>
            <div
              className={` ${styles.landing__wrapperCard} ${styles.landing__cardMobile} ${styles.landing__marginCard}`}>
              <Animated
                animationIn="zoomIn"
                animationOut="zoomOut"
                animationInDuration={1000}
                animationOutDuration={1000}
                isVisible={true}>
                <Banner src="/assets/images/banner_landing2.png"></Banner>
              </Animated>
            </div>
          </article>
        </section>
        {/* 3th Section */}
        <section className={styles.landing__info}>
          <header className={styles.landing__infoTitle}>
            {t('landing.title_info')}
          </header>
          <article>
            <div className={styles.landing__itemList}>
              <div
                className={`${styles.landing__itemText}`}>
                <span className={styles.landing__fontWeight}>{t('landing.item_info_1')}</span>
              </div>
            </div>
            <div className={styles.landing__itemList}>
              <div className={styles.landing__itemText}>
                <span className={styles.landing__fontWeight}>
                  {t('landing.item_info_2')}
                </span>
                <span>{t('landing.item_info_3')}</span>
              </div>
            </div>
          </article>
          <article className={styles.landing__imgSecc1}>
          <img
            src="/assets/images/landing1.svg"></img>
          </article>
        </section>
        {/* 4th Section */}
        <section className={styles.landing__joinus}>
          <header className={styles.landing__infoTitle2}>
            {t('landing.title_joinus')}
          </header>
          <p>{t('landing.parr_joinus')}</p>
          <div className={styles.landing__joinusButtonWrapper}>
            <section className={styles.landing__joinusButton}>
              <BaseButton
                onClick={redirectRegister}
                properties={buttonProperties2}></BaseButton>
            </section>
          </div>
        </section>
        {/* 5th Section */}
        <section className={styles.landing__joinusImage}>
          <section className={styles.landing__joinusImageDesk}>
            <img src="/assets/images/banner_landing3.png"></img>
          </section>
          <section className={styles.landing__joinusImageMob}>
            <img src="/assets/images/banner_landing4.png"></img>
          </section>
        </section>
        <div>
          <div className={styles.landing__up} onClick={scrollToTop}>
            <i className={`icon-arrow-up ${styles.landing__iconUp}`}></i>
          </div>
        </div>
      </section>
      <FooterLanding></FooterLanding>
    </section>
  );
}

export default LandingLayout;
