import React from 'react';
import ImageIcon from '@mui/icons-material/Image';

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
        <ImageIcon className={styles.icon} />
      )}
    </div>
  );
}
