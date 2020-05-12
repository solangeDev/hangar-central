import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import withLocale from '../../hocs/withLocale';
import LoginLayout from '../../layouts/login';
import { setRegister } from '../../redux/register/registerActions';
import SingUpStep2 from '../../components/SingUpStep2';
import {
  selectRegisterPassword,
  selectRegisterEmail,
  selectRegisterValidateCode,
} from '../../redux/register/registerSelectors';
import { selectUser } from '../../redux/user/userSelectors';

class Step2 extends React.Component {
  static async getInitialProps({ store }) {
    return store;
  }

  render() {
    if (this.props.email === '' || this.props.password === '') {
      Router.push('/[locale]', `/${this.props.user.locale}`, {
        shallow: true,
      });
      return null;
    } else if (this.props.validateCode === true) {
      Router.push('/[locale]/step-3', `/${this.props.user.locale}/step-3`, {
        shallow: true,
      });
      return null;
    } else {
      return (
        <LoginLayout iconClose={false}>
          <SingUpStep2
            setRegister={this.props.setRegister}
            email={this.props.email}
            password={this.props.password}></SingUpStep2>
        </LoginLayout>
      );
    }
  }
}

const mapStateToProps = state => ({
  email: selectRegisterEmail(state),
  password: selectRegisterPassword(state),
  validateCode: selectRegisterValidateCode(state),
  user: selectUser(state),
});

const mapDispatchToProps = {
  setRegister: setRegister,
};

export default connect(mapStateToProps, mapDispatchToProps)(withLocale(Step2));
