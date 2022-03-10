/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { relativeTime } from 'util/conversor';
import Carousel from 'components/Carousel';
import styles from './styles.module.css';

export default function PublicationsList({ publications }) {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  const navigateToPublication = (id) => {
    const type = role === 'donor' ? 'donor' : 'institution';
    navigate(`/${type}/publication/${id}`);
  };

  return (
    <div className={styles.list}>
      {publications.map((item) => (
        <div
          onClick={() => navigateToPublication(item._id)}
          className={styles.card}
          key={item._id}
        >
          <Carousel images={item.images} />
          <div style={{ padding: 5 }}>
            <p className={styles.instituition}>{item.nameInstitution}</p>
            <div className={styles.nameContainer}>
              <p className={styles.name}>{item.title}</p>
            </div>
            <p className={styles.time}>{relativeTime(item.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
