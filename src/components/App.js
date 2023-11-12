//import { useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/api';
import { useEffect } from 'react';
import { getError, getIsLoading } from 'redux/selectors';

export const App = () => {
  //const filterValue = useSelector(state => state.filter.filter);
  //const contactsValue = useSelector(state => state.contacts.contacts);

  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  /*
  const visibleContacts = contactsValue.filter(contact => {
    const normalizedFilter = filterValue.toLowerCase();
    return contact.name.toLowerCase().includes(normalizedFilter);
  });
  */

  return (
    <div className="card">
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {/*{visibleContacts.length > 0 && <ContactList />}*/}
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactList />
    </div>
  );
};
