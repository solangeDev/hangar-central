import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import Seeker from '../Seeker';
import useTranslation from '../../hooks/useTranslation';
import { LocaleContext } from '../../context/LocaleContext';

export default function FeedMenu(props) {
  const { locale } = React.useContext(LocaleContext);
  const { t } = useTranslation();
  useEffect(() => {});

  const toggleHoverIn = e => {
    let id = e.target.id.split('-');
    id = id[1];
    document.getElementById(`border-${id}`).style.display = 'block';
    document.getElementById(`icon-${id}`).style.color = '#0a2a43';
    document.getElementById(`link-${id}`).style.color = '#0a2a43';
  };

  const toggleHoverOut = e => {
    let id = e.target.id.split('-');
    id = id[1];
    document.getElementById(`border-${id}`).style.display = 'none';
    document.getElementById(`icon-${id}`).style.color = '#a9a9a9';
    document.getElementById(`link-${id}`).style.color = '#a9a9a9';
  };

  return (
    <div className={styles.FeedMenu}>
      <nav className={styles.FeedMenu__container}>
        <div className={styles.FeedMenu__Searcher}>
          <Seeker></Seeker>
        </div>
        <div
          id="div-inicio"
          className={styles.FeedMenu__menu}
          onMouseEnter={toggleHoverIn}
          onMouseLeave={toggleHoverOut}>
          <div className={styles.FeedMenu__borderMenu} id="border-inicio"></div>
          <div className={styles.FeedMenu__iconMenu} id="icon-inicio">
            <i className="icon-menu-home"></i>
          </div>
          <div className={styles.FeedMenu__linkMenu}>
            <Link href={`#`}>
              <a
                id="link-inicio"
                onMouseEnter={toggleHoverIn}
                onMouseLeave={toggleHoverOut}
                className="">
                {t('FeedMenu.option1')}
              </a>
            </Link>
          </div>
        </div>
        <div
          id="div-red"
          className={styles.FeedMenu__menu}
          onMouseEnter={toggleHoverIn}
          onMouseLeave={toggleHoverOut}>
          <div className={styles.FeedMenu__borderMenu} id="border-red"></div>
          <div className={styles.FeedMenu__iconMenu} id="icon-red">
            <i className="icon-menu-red"></i>
          </div>
          <div className={styles.FeedMenu__linkMenu}>
            <Link href={`#`}>
              <a
                href="#"
                id="link-red"
                onMouseEnter={toggleHoverIn}
                onMouseLeave={toggleHoverOut}
                className="">
                {t('FeedMenu.option2')}
              </a>
            </Link>
          </div>
        </div>
        <div
          id="div-empleos"
          className={styles.FeedMenu__menu}
          onMouseEnter={toggleHoverIn}
          onMouseLeave={toggleHoverOut}>
          <div
            className={styles.FeedMenu__borderMenu}
            id="border-empleos"></div>
          <div className={styles.FeedMenu__iconMenu} id="icon-empleos">
            <i className="icon-menu-empleos"></i>
          </div>
          <div className={styles.FeedMenu__linkMenu}>
            <Link href={`#`}>
              <a
                id="link-empleos"
                href="#"
                onMouseEnter={toggleHoverIn}
                onMouseLeave={toggleHoverOut}
                className="">
                {t('FeedMenu.option3')}
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
