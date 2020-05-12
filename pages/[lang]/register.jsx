import React from 'react';
import { connect } from 'react-redux';

import withLocale from '../../hocs/withLocale';
import { setRegister } from '../../redux/register/registerActions';
import LoginLayout from '../../layouts/login';
import SingUpStep1 from '../../components/SingUpStep1';
import { selectRegisterPassword, selectRegisterEmail } from '../../redux/register/registerSelectors';

class Register extends React.Component {
  static async getInitialProps({ store }) {
    return store;
  }

  render() {
    return (
      <LoginLayout iconClose={true}>
        <SingUpStep1
          setRegister={this.props.setRegister} 
          email={this.props.email}
          password={this.props.password}></SingUpStep1>
      </LoginLayout>
    );
  }
}

const mapStateToProps = state => ({
  email: selectRegisterEmail(state),
  password: selectRegisterPassword(state),
});

const mapDispatchToProps = {
  setRegister: setRegister,
};

export default connect(mapStateToProps, mapDispatchToProps)(withLocale(Register));
