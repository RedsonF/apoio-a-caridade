import React from 'react';

import styles from './styles.module.css';

export default function Form({ children, gap, transparent }) {
  return (
    <div
      className={transparent ? styles.container2 : styles.container}
      style={{ gap: gap || 10 }}
    >
      {children}
    </div>
  );
}
