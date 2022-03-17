import React from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import styles from './styles.module.css';

export default function LogoImage({ image, size }) {
  const logoStyle = () => {
    switch (size) {
      case 'small':
        return { height: 60, width: 60, minWidth: 60 };
      case 'big':
        return { height: 100, width: 100 };
      default:
        return {};
    }
  };
  return (
    <div className={styles.image} style={logoStyle()}>
      {image ? (
        <img alt="imagem" src={image} />
      ) : (
        <PersonRoundedIcon className={styles.icon} />
      )}
    </div>
  );
}
