import React from 'react';
import { connect } from 'react-redux';

import withLocale from '../../hocs/withLocale';

import LoginLayout from '../../layouts/login';
import ChangePassword from '../../components/ChangePassword';

import { setNotification } from '../../redux/notification/notificationActions';
import { selectNotification } from '../../redux/notification/notificationSelectors';

class ChangedPassword extends React.Component {
  render() {
    return (
      <LoginLayout iconClose={true}>
        <div></div>
        <ChangePassword
          setNotification={this.props.setNotification}
          notification={this.props.notification}>
          {' '}
        </ChangePassword>
      </LoginLayout>
    );
  }
}
const mapStateToProps = state => ({
  notification: selectNotification(state),
});

const mapDispatchToProps = {
  setNotification: setNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLocale(ChangedPassword));
