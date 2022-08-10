// import { Component } from 'react/cjs/react.production.min';
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import wrapper from './App.css';

import { useSelector, useDispatch } from 'react-redux';
import { addContactRedux, deleteContactRedux } from 'redux/contactReducer';

export const App = () => {
  // const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const reduxContacts = useSelector(state => state.contacts);
  console.log(reduxContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(reduxContacts));
  }, [reduxContacts]);

  function addContact(name, number) {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    isSameContact(name, number)
      ? alert('This contact is already exists')
      : dispatch(addContactRedux(newContact));
  }

  function isSameContact(name, number) {
    return (
      reduxContacts.find(
        contact =>
          contact.name.toLowerCase().trim() === name.toLowerCase().trim()
      ) ||
      reduxContacts.find(contact => contact.number.trim() === number.trim())
    );
  }

  function deleteContact(contactId) {
    dispatch(deleteContactRedux(contactId));
  }

  function handleFilterChange(value) {
    setFilter(value);
  }

  function filteredContacts() {
    const filteredContacts = reduxContacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts;
  }

  return (
    <div style={wrapper}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h1>Contacts</h1>

      <Filter onChange={handleFilterChange} value={filter} />

      {reduxContacts && (
        <ContactList contacts={reduxContacts} onDelete={deleteContact} />
      )}
    </div>
  );
};
