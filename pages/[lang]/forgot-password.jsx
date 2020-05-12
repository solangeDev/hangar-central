import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import withLocale from '../../hocs/withLocale';
import useTranslation from '../../hooks/useTranslation';

import LoginLayout from '../../layouts/login';
import LocaleSwitcher from '../../components/LocaleSwitcher';
import ForgotPassword from '../../components/ForgotPassword';



/*function CounterTitle() {
  const { t } = useTranslation();
  return <div>{t('about')}</div>;
}*/

function  ForgorPassword() {

  return (
    <LoginLayout iconClose={true}>      
      <ForgotPassword> </ForgotPassword>
    </LoginLayout>
  );
}

const mapStateToProps = state => ({
  /*counter: state.counterReducer.counter,*/
});

const mapDispatchToProps = {
  /*incrementCounter: incrementCounter,
  decrementCounter: decrementCounter,*/
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLocale(ForgorPassword));
