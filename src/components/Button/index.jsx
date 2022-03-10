import React from 'react';
import Button from '@mui/material/Button';

import styles from './styles.module.css';

export default function CustomButton({
  onClick,
  children,
  red,
  style,
  icon,
  small,
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={red ? styles.red : styles.blue}
      style={{ ...style, height: small ? 38 : '' }}
    >
      {children} <p className={styles.icon}>{icon}</p>
    </Button>
  );
}
