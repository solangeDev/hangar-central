import React from 'react';
import { connect } from 'react-redux';
import withLocale from '../../hocs/withLocale';
import LoginLayout from '../../layouts/login';
import ContactsForm from '../../components/Contacts';
import { selectContacts } from '../../redux/contacts/contactsSelectors';
import { selectUser } from '../../redux/user/userSelectors';
import { setContacts } from '../../redux/contacts/contactsActions';
import Router from 'next/router';
class Contacts extends React.Component {
  static async getInitialProps({ store }) {
    return store;
  }

  render() {
    if (
      this.props.contacts.emailData.lenght === 0 &&
      this.props.contacts.apiData.lenght === 0
    ) {
      Router.push('/[locale]', `/${this.props.user.locale}`, {
        shallow: true,
      });
      return null;
    } else {
      return (
        <LoginLayout iconClose={false}>
          <ContactsForm
            setContacts={this.props.setContacts}
            contacts={this.props.contacts}
            session={this.props.session}></ContactsForm>
        </LoginLayout>
      );
    }
  }
}

const mapStateToProps = state => ({
  contacts: selectContacts(state),
  session: selectUser(state),
});

const mapDispatchToProps = {
  setContacts: setContacts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLocale(Contacts));
