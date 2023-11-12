import { List, ListItem } from './ContactList.styled';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
//import { deleteContact } from 'redux/contactSlice';

export const ContactList = () => {
  const getvisibleContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const visibleContacts = getvisibleContacts(contacts, filter);

  return (
    <List>
      {visibleContacts.map(contact => (
        <ListItem key={contact.id}>
          <p>
            <span>{contact.name}: </span>
            <span>{contact.phone}</span>
          </p>

          <button
            type="button"
            id={contact.name}
            className="btn btn-outline"
            //onClick={onDelete}
          >
            Delete
          </button>
        </ListItem>
      ))}
    </List>
  );
};
