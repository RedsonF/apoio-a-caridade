/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './styles.module.css';

export default function CustomInput({
  value,
  onChange,
  icon,
  label,
  placeholder,
  type,
  error,
}) {
  const errorStyle = {
    border: error ? '1px solid var(--red)' : '',
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <div
        className={styles.container}
        style={{ ...errorStyle, paddingLeft: icon ? 2 : 0 }}
      >
        {icon}
        {type === 'textarea' ? (
          <textarea
            rows="5"
            value={value}
            onChange={onChange}
            className={styles.input}
          />
        ) : (
          <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            className={styles.input}
          />
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
