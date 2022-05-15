import propTypes from 'prop-types';
import styles from './ContactsList.module.css';
import ContactsListItem from './ContactsListItem/ContactsListItem';


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


ContactsList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
    })
  ),
  onRemove: propTypes.func.isRequired,
};

export default ContactsList;
