import React from 'react';
import { connect } from 'react-redux';
import withLocale from '../../hocs/withLocale';
import FeedLayout from '../../layouts/Feed';
import { selectUser } from '../../redux/user/userSelectors';
import { setUser } from '../../redux/user/userActions';
import Router from 'next/router';
import { LocaleContext } from '../../context/LocaleContext';

function Feed(props) {
  const { locale } = React.useContext(LocaleContext);
  if (props.session.email === '') {
    Router.replace(`/${locale}/login`);
    return null;
  } else {
    return (
      <FeedLayout setUser={props.setUser} session={props.session}></FeedLayout>
    );
  }
}

const mapStateToProps = state => ({
  session: selectUser(state),
});

const mapDispatchToProps = {
  setUser: setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withLocale(Feed));
