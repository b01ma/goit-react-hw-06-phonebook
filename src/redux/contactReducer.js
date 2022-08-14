import { createAction, createReducer } from '@reduxjs/toolkit';

export const addContactRedux = createAction('contacts/newContact');
export const deleteContactRedux = createAction('contacts/deleteContact');

export const items = createReducer([], {
  [addContactRedux]: (state, action) => [...state, action.payload],
  [deleteContactRedux]: (state, action) =>
    state.filter(contact => contact.id !== action.payload),
});
