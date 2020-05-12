import React from 'react';
import { connect } from 'react-redux';
import withLocale from '../../hocs/withLocale';
import LandingLayout from '../../layouts/landing';
import { setRegister } from '../../redux/register/registerActions';
import { setUser } from '../../redux/user/userActions';
import {
  selectRegisterPassword,
  selectRegisterEmail,
} from '../../redux/register/registerSelectors';
import { selectUser } from '../../redux/user/userSelectors';
import { cleanUser } from '../../redux/user/userActions';

class Landing extends React.Component {
  static async getInitialProps({ store }) {
    return store;
  }

  componentDidMount() {
    this.props.setRegister({
      email: '',
      password: '',
      validateCode: false,
    });
    if (this.props.session.logout) {
      this.props.cleanUser();
    }
  }

  render() {
    return <LandingLayout></LandingLayout>;
  }
}

const mapStateToProps = state => ({
  email: selectRegisterEmail(state),
  password: selectRegisterPassword(state),
  session: selectUser(state),
});

const mapDispatchToProps = {
  setRegister: setRegister,
  setUser: setUser,
  cleanUser: cleanUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLocale(Landing));
