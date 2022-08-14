import { Button, Ul, Li } from './ContactList.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactRedux } from 'redux/contactReducer';

const ContactList = () => {
  const reduxContacts = useSelector(state => state.contacts);
  const reduxFilter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  function deleteContact(contactId) {
    dispatch(deleteContactRedux(contactId));
  }

  function filteredContacts() {
    const filteredContacts = reduxContacts.filter(contact =>
      contact.name.toLowerCase().includes(reduxFilter.toLowerCase())
    );

    return filteredContacts;
  }

  console.log(reduxContacts);

  // const test = testVar => {
  //   console.log(testVar);

  //   testVar.map(item => console.log(item));
  // };

  // test(reduxContacts);

  return (
    <Ul>
      {reduxContacts &&
        filteredContacts().map(contact => (
          <Li key={contact.id}>
            {contact.name}: {contact.number}
            <Button onClick={() => deleteContact(contact.id)}>Delete</Button>
          </Li>
        ))}
    </Ul>
  );
};

export default ContactList;
