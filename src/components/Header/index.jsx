import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from 'components/IconButton';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import styles from './styles.module.css';

const buttonStyle = {
  position: 'absolute',
  left: 0,
};

export default function Header({ title, path }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {path && (
        <IconButton onClick={() => navigate(path)} style={buttonStyle}>
          <ArrowBackRoundedIcon className={styles.icon} />
        </IconButton>
      )}
      <p className={styles.title}>{title}</p>
    </div>
  );
}
