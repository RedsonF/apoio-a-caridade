import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import LogoImage from 'components/LogoImage';

import styles from './styles.module.css';

export default function CoverImage({ image, logo }) {
  return (
    <div className={styles.img}>
      {image ? (
        <img alt="imagem" src={image} />
      ) : (
        <ImageIcon className={styles.icon} />
      )}
      {logo !== undefined && (
        <div className={styles.logo}>
          <LogoImage image={logo} />
        </div>
      )}
    </div>
  );
}
