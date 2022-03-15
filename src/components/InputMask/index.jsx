/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import InputMask from 'react-input-mask';
import styles from './styles.module.css';

export default function CustomInputMask({
  value,
  onChange,
  label,
  placeholder,
  type,
  error,
}) {
  const customStyle = {
    border: error ? '1px solid var(--red)' : '',
  };

  const myMask = () => {
    let newMask = '99.999.999/999-99';
    if (type === 'cpf') newMask = '999.999.999-99';
    else if (type === 'hour') newMask = '99:99';
    else if (type === 'phone') newMask = '(99) 99999-9999';
    return newMask;
  };

  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <InputMask
        placeholder={placeholder}
        mask={myMask()}
        className={styles.input}
        style={{ ...customStyle }}
        onChange={onChange}
        value={value}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
