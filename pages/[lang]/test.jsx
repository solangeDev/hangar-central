import React from 'react';
import { connect } from 'react-redux';

import withLocale from '../../hocs/withLocale';
import NotificationAlert from '../../components/NotificationAlert';
import LoginLayout from '../../layouts/login';
import YahooApi from '../../components/YahooApi';

function Test() {
  const getContacts = e => {
    console.log(e);
  };
  return (
    <LoginLayout iconClose={true}>
      <YahooApi getContacts={getContacts} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withLocale(Test));
