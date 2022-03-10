import React from 'react';
import Select from 'react-select';

import styles from './styles.module.css';

export default function CustomSelect({
  onChange,
  label,
  placeholder,
  options,
  value,
  error,
  isClearable,
}) {
  const customStyles = {
    // width: 100%;
    // background: var(--gray-50);
    // border-radius: 10px;
    // border: none;
    // padding: 10px;
    // font-size: 16px;
    control: (base) => ({
      ...base,
      background: 'var(--gray-50)',
      border: error ? '1px solid var(--red)' : '1px solid var(--borderColor)',
      borderRadius: 10,
      boxShadow: 'none',
      height: 43,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      borderRadius: 0,
      hyphens: 'auto',
      marginTop: 0,
      textAlign: 'left',
      wordWrap: 'break-word',
      minHeight: 20,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      minHeight: 20,
    }),
  };

  return (
    <div>
      {label && <label htmlFor="select">{label}</label>}
      <Select
        id="select"
        className={styles.select}
        options={options}
        onChange={onChange}
        value={value}
        defaultValue={value}
        styles={customStyles}
        placeholder={placeholder || false}
        isClearable={isClearable}
      />
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
