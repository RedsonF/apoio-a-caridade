import React, { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import IconButton from '../IconButton';

import styles from './styles.module.css';

export default function Footer() {
  const buttonFeed = {
    background: 'var(--blue)',
    height: 50,
    width: 50,
    marginBottom: 35,
    border: '1px solid var(--borderColor)',
  };

  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  const navigateToHome = () => {
    const link = role === 'donor' ? '/donor/home' : '/institution/home';
    navigate(link);
  };

  const navigateToFeed = () => {
    const link = role === 'donor' ? '/donor/feed' : '/institution/publications';
    navigate(link);
  };

  const navigateToOptions = () => {
    const link = role === 'donor' ? '/donor/options' : '/institution/settings';
    navigate(link);
  };

  if (!role) {
    return null;
  }

  return (
    <div className={styles.container}>
      <IconButton onClick={() => navigateToHome()}>
        <HomeRoundedIcon className={styles.icon} />
      </IconButton>
      <IconButton style={buttonFeed} onClick={() => navigateToFeed()}>
        <FeedRoundedIcon className={styles.iconFeed} />
      </IconButton>
      <IconButton onClick={() => navigateToOptions()}>
        <PersonRoundedIcon className={styles.icon} />
      </IconButton>
    </div>
  );
}
