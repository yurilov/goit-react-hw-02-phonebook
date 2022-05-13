import propTypes from 'prop-types';
import styles from './ContactsList.module.css';

const ContactsListItem = ({ id, name, number, onRemove }) => {
  return (
    <li className={styles.item} key={id}>
      {name}: {number}
      <button onClick={() => onRemove(id)} className={styles.button}>
        Delete
      </button>
    </li>
  );
};

const ContactsList = ({ contacts, onRemove }) => {
  if (contacts.length === 0) return null;
  return (
    <ol className={styles.list}>
      {contacts.map((contact, id) => {
        return (
        <ContactsListItem 
          {...contact} 
          key={id} 
          onRemove={onRemove} 
        />); 
      })}
    </ol>
  );
};

ContactsListItem.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  number: propTypes.string.isRequired,
  onRemove: propTypes.func,
};
ContactsList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
    })
  ),
  onRemove: propTypes.func,
};

export default ContactsList;
