import React from 'react';
import IconButton from '@mui/material/IconButton';

import styles from './styles.module.css';

export default function CustomIconButton({ onClick, children, style }) {
  return (
    <IconButton
      type="button"
      onClick={onClick}
      className={styles.container}
      style={style}
    >
      {children}
    </IconButton>
  );
}
