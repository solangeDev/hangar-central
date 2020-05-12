import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import withLocale from '../../hocs/withLocale';
import LoginLayout from '../../layouts/login';
import { setUser } from '../../redux/user/userActions';
import { setRegister } from '../../redux/register/registerActions';
import SingUpStep3 from '../../components/SingUpStep3';
import {
  selectRegisterPassword,
  selectRegisterEmail,
  selectRegisterValidateCode,
} from '../../redux/register/registerSelectors';

class Step3 extends React.Component {
  static async getInitialProps({ store }) {
    return store;
  }

  render() {
    if (
      this.props.email === '' ||
      this.props.password === '' ||
      !this.props.validateCode
    ) {
      Router.replace('/');
      return null;
    } else {
      return (
        <LoginLayout iconClose={false}>
          <SingUpStep3
            setUser={this.props.setUser}
            setRegister={this.props.setRegister}
            email={this.props.email}
            password={this.props.password}></SingUpStep3>
        </LoginLayout>
      );
    }
  }
}

const mapStateToProps = state => ({
  email: selectRegisterEmail(state),
  password: selectRegisterPassword(state),
  validateCode: selectRegisterValidateCode(state),
});

const mapDispatchToProps = {
  setUser: setUser,
  setRegister: setRegister,
};

export default connect(mapStateToProps, mapDispatchToProps)(withLocale(Step3));
