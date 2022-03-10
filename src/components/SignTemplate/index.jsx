import React from 'react';
import styles from './styles.module.css';

export default function Login({ children }) {
  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <p>Apoio a Caridade</p>
      </div>
      {children}
    </div>
  );
}
