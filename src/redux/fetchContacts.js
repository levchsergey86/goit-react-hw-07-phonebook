import {
  fetchingInProgress,
  fetchingSuccess,
  fetchingError,
} from './contactsSlice';
import axios from 'axios';

const API_URL = 'https://64bee4335ee688b6250d0873.mockapi.io/contacts/contacts';

export const fetchContacts = () => async dispatch => {
  dispatch(fetchingInProgress());

  try {
    const response = await axios.get(API_URL);
    const contacts = response.data;

    dispatch(fetchingSuccess(contacts));
  } catch (error) {
    dispatch(fetchingError(error.message));
  }
};
