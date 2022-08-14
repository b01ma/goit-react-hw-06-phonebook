import { useState } from 'react';
import { Wrapper, Label, Button } from './ContactForm.css';
import { addContactRedux } from 'redux/contactReducer';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const reduxContacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  function handleChange(e) {
    if (e.currentTarget.name === 'name') {
      setName(e.currentTarget.value);
    }

    if (e.currentTarget.name === 'number') {
      setNumber(e.currentTarget.value);
    }
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

  function handleSubmit(e) {
    e.preventDefault();

    addContact(name, number);

    setName('');
    setNumber('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <Wrapper>
        <Label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
          />
        </Label>

        <Label>
          Contact
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
          />
        </Label>

        <Button type="submit">Add contact</Button>
      </Wrapper>
    </form>
  );
};

export default ContactForm;
