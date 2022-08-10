import { configureStore } from '@reduxjs/toolkit';

import { contactReducer } from './contactReducer';
import filterReducer from './filterReducer';

const getInitialState = contactArray => {
  return {
    contacts: contactArray,
    filter: '',
  };
};

let initialState = {
  contacts: [],
  filter: '',
};

const savedContacts = JSON.parse(localStorage.getItem('contacts'));

if (savedContacts) {
  initialState = getInitialState(savedContacts);
}

console.log(initialState);

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
  },
  preloadedState: initialState,
});
