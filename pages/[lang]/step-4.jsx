import React from 'react';
import { connect } from 'react-redux';

import withLocale from '../../hocs/withLocale';
import NotificationAlert from '../../components/NotificationAlert';
import LoginLayout from '../../layouts/login';
import SingUpStep4 from '../../components/SingUpStep4';

import { setContacts } from '../../redux/contacts/contactsActions';
import { selectContacts } from '../../redux/contacts/contactsSelectors';
import { selectUser } from '../../redux/user/userSelectors';

class Step4 extends React.Component {
  render() {
    return (
      <LoginLayout iconClose={true}>
        <SingUpStep4
          session={this.props.session}
          contacts={this.props.contacts}
          setContacts={this.props.setContacts}
        />
      </LoginLayout>
    );
  }
}

const mapStateToProps = state => ({
  contacts: selectContacts(state),
  session: selectUser(state),
});

const mapDispatchToProps = {
  setContacts: setContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(withLocale(Step4));
