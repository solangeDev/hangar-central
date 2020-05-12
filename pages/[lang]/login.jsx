import React from 'react';
import { connect } from 'react-redux';

import withLocale from '../../hocs/withLocale';
import { setUser } from '../../redux/user/userActions';
import { setRememberMe } from '../../redux/rememberMe/rememberMeActions';
import LoginLayout from '../../layouts/login';
import LoginForm from '../../components/Login';
import { selectUser } from '../../redux/user/userSelectors';
import { selectRememberMe } from '../../redux/rememberMe/rememberMeSelectors';

import { setNotification } from '../../redux/notification/notificationActions';
import { selectNotification } from '../../redux/notification/notificationSelectors';
import { cleanUser } from '../../redux/user/userActions';

class Login extends React.Component {
  componentDidMount() {
    if (this.props.user.logout) {
      this.props.cleanUser();
    }
  }
  render() {
    return (
      <LoginLayout iconClose={true}>
        <LoginForm
          setUser={this.props.setUser}
          setRememberMe={this.props.setRememberMe}
          user={this.props.user}
          rememberMe={this.props.rememberMe}
          notification={this.props.notification}></LoginForm>
      </LoginLayout>
    );
  }
}

const mapStateToProps = state => ({
  user: selectUser(state),
  rememberMe: selectRememberMe(state),
  notification: selectNotification(state),
});

const mapDispatchToProps = {
  setUser: setUser,
  setRememberMe: setRememberMe,
  setNotification: setNotification,
  cleanUser: cleanUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withLocale(Login));
