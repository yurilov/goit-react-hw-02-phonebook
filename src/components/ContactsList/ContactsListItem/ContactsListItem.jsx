import propTypes from 'prop-types';
import styles from './ContactsListItem.module.css';

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

ContactsListItem.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  number: propTypes.string.isRequired,
  onRemove: propTypes.func,
};


export default ContactsListItem;