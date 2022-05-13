import propTypes from "prop-types";
import styles from './Filter.module.css';

const Filter = ({ filter, onChange, title }) => {
    return (
        <>
            <h3 className={styles.title}>{title}</h3>
            <input
                className={styles.input}
                type="text"
                name="filter"
                value={filter}
                onChange={({ target }) => onChange(target.value)}
                placeholder="Enter contact name"
                />
        </>
    );
}

Filter.propTypes = {
    filter: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
};

export default Filter;
