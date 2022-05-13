import './App.css';
import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleContactAdd = newContact =>
    this.setState(
      ({ contacts }) => ({
        contacts: [...contacts, newContact],
      }),
      Notify.success('Contact is added to phonebook')
    );

  checkIfContactIsUnique = name => {
    const { contacts } = this.state;
    const contactExcists = contacts.find(contact => contact.name === name);
    contactExcists && Notify.failure('Contact is already in a phonebook');

    return !contactExcists;
  };

  handleContactRemove = id =>
    this.setState(
      ({ contacts }) => ({
        contacts: contacts.filter(contact => contact.id !== id),
      }),
      Notify.success('Contact is deleted')
    );

  handleFilterChange = filter => this.setState({ filter });

  getContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const contacts = this.getContacts();

    return (
      <>
        <Section title="Phonebook">
          <ContactForm
            onAdd={this.handleContactAdd}
            checkUnique={this.checkIfContactIsUnique}
            />
        </Section>
        <Section title="Contacts">
          <Filter
            filter={filter}
            onChange={this.handleFilterChange}
            title="Find contacts by name"
          />
          <ContactsList
            contacts={contacts}
            onRemove={this.handleContactRemove}
            />
        </Section>
      </>
    );
  }
}

export default App;
