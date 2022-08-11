// import { Component } from 'react/cjs/react.production.min';
import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import wrapper from './App.css';

import { useSelector, useDispatch } from 'react-redux';
import { addContactRedux, deleteContactRedux } from 'redux/contactReducer';
import { setReduxFilter } from 'redux/filterReducer';

export const App = () => {
  const reduxContacts = useSelector(state => state.contacts);
  const reduxFilter = useSelector(state => state.filter);
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
    dispatch(setReduxFilter(value));
  }

  function filteredContacts() {
    const filteredContacts = reduxContacts.filter(contact =>
      contact.name.toLowerCase().includes(reduxFilter.toLowerCase())
    );

    return filteredContacts;
  }

  return (
    <div style={wrapper}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h1>Contacts</h1>

      <Filter onChange={handleFilterChange} value={reduxFilter} />

      {reduxContacts && (
        <ContactList contacts={filteredContacts()} onDelete={deleteContact} />
      )}
    </div>
  );
};
