/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './styles.module.css';

export default function Checkbox({ checked, value, onChange, label }) {
  return (
    <div className={styles.container}>
      <input
        checked={checked}
        value={value}
        onChange={onChange}
        type="checkbox"
      />
      <label className={styles.geek}>{label}</label>
    </div>
  );
}
