import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import FilterContacts from './FilterContacts/FilterContacts';
import ContactList from './ContactList/ContactList';
// import { setFilter } from '../redux/filterSlice';
import styled from './App.module.css';
import { fetchContacts } from 'redux/fetchContacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilterValue] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  // const fetchContacts = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://64bee4335ee688b6250d0873.mockapi.io/contacts/contacts'
  //     );
  //     const contactsData = response.data;
  //     setContacts(contactsData);
  //   } catch (error) {
  //     console.error('Error fetching contacts:', error);
  //   }
  // };

  const handleDeleteContact = async id => {
    try {
      await axios.delete(
        `https://64bee4335ee688b6250d0873.mockapi.io/contacts/contacts/${id}`
      );
      setContacts(prevContacts =>
        prevContacts.filter(contact => contact.id !== id)
      );
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleAddContact = async (name, number) => {
    const isContactExists = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() &&
        contact.number === number
    );

    if (isContactExists) {
      alert('Contact with the same name or number already exists.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    try {
      const response = await axios.post(
        'https://64bee4335ee688b6250d0873.mockapi.io/contacts/contacts/',
        newContact
      );
      setContacts(prevContacts => [...prevContacts, response.data]);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleFilterChange = event => {
    setFilterValue(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styled.container}>
      <h1>PHONE BOOK</h1>
      <ContactForm addContact={handleAddContact} />
      <h2>Contacts:</h2>
      <FilterContacts handleFilterChange={handleFilterChange} />
      <ContactList
        filteredContacts={filteredContacts}
        deleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
