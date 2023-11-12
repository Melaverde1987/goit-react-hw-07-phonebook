import { List, ListItem } from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/api';

export const ContactList = () => {
  const getvisibleContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const visibleContacts = getvisibleContacts(contacts, filter);

  const dispatch = useDispatch();
  const handleDelete = evt => dispatch(deleteContact(evt.target.id));

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
            id={contact.id}
            className="btn btn-outline"
            onClick={handleDelete}
          >
            Delete
          </button>
        </ListItem>
      ))}
    </List>
  );
};
