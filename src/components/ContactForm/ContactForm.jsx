import { Component } from "react";
import propTypes from "prop-types";
import styles from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const INITIAL_STATE = {
  name: "",
  number: "",
};

class ContactForm extends Component {
  state = INITIAL_STATE;

  handleFormChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const { onAdd } = this.props;
    const isFormValid = this.validateForm();

    if (!isFormValid) return;

    onAdd({ id: nanoid(), name, number });
    this.resetForm();
  };

  validateForm = () => {
    const { name, number } = this.state;
    const { checkUnique } = this.props;

    if (!name || !number) {
      Notify.failure("Please fill all the fields");
      return false;
    }
    return checkUnique(name);
  };
  
  resetForm = () => this.setState(INITIAL_STATE);

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit} key={this.id} className={styles.form}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={this.handleFormChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={styles.label}>
          Number
          <input
            className={styles.input}
            type="tel"
            name="number"
            placeholder="Enter phone number"
            value={number}
            onChange={this.handleFormChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  checkUnique: propTypes.func.isRequired,
  onAdd: propTypes.func.isRequired,
};

export default ContactForm;