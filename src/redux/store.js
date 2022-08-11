import { configureStore } from '@reduxjs/toolkit';

import { contactReducer } from './contactReducer';
import { filterReducer } from './filterReducer';

const savedContacts = JSON.parse(localStorage.getItem('contacts'));

const getInitialState = contactArray => {
  console.log(contactArray);
  if (contactArray) {
    return {
      contacts: contactArray,
      filter: '',
    };
  } else {
    return {
      contacts: [],
      filter: '',
    };
  }
};

const initialState = getInitialState(savedContacts);

console.log(initialState);

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
  },
  preloadedState: initialState,
});
