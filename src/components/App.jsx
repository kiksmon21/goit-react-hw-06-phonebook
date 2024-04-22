import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from '../redux/contactsSlice';
import { setFilter } from '../redux/filterSlice';
import { getContacts, getFilter } from '../redux/selectors';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import style from './App.module.css';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleSetFilter = newFilter => {
    dispatch(setFilter(newFilter));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className={style.content}>
      <div className={style.content__container}>
        <h1 className={style.form__title}>Phonebook</h1>
        <ContactForm addContact={handleAddContact} contacts={contacts} />

        <h2 className={style.contact__title}>Contacts</h2>
        <Filter filter={filter} setFilter={handleSetFilter} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={handleDeleteContact}
        />
      </div>
    </section>
  );
};