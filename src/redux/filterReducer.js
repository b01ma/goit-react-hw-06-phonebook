import { createAction, createReducer } from '@reduxjs/toolkit';

export const setReduxFilter = createAction('filter/setFilter');

export const filterReducer = createReducer('', {
  [setReduxFilter]: (state, action) => (state = action.payload),
});
