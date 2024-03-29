import { Component } from 'react';
import { ContactForm } from './Form/Form';
import { ContactsList } from './ContactList/ContactsList';
import { Filter } from './Filter/Filter';
import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { Header } from './Header/Header';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsLS = localStorage.getItem('contacts');
    if (contactsLS !== null) {
      this.setState({
        contacts: JSON.parse(contactsLS),
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = newContact => {
    const isExist = this.state.contacts.find(
      contact => contact.name === newContact.name
    );
    if (isExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  handleFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts } = this.state;
    const itemContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter)
    );

    return (
      <Layout>
        <Section title="Phonebook">
          <ContactForm onAddContact={this.handleAddContact} />
          <Header title="Contacts" />
          <Filter value={this.state.filter} onFilter={this.handleFilter} />
          <ContactsList
            contacts={itemContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        </Section>
      </Layout>
    );
  }
}
