/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { relativeTime } from 'util/conversor';
import Carousel from 'components/Carousel';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import styles from './styles.module.css';

export default function PublicationsList({ publications }) {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);
  const [like, setLike] = useState(false);

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
          <div style={{ padding: 5 }}>
            <p className={styles.instituition}>{item.nameInstitution}</p>
          </div>
          <Carousel images={item.images} />
          <div>
            <div className={styles.like}>
              {like ? (
                <FavoriteRoundedIcon
                  onClick={(event) => {
                    event.stopPropagation();
                    setLike(!like);
                  }}
                />
              ) : (
                <FavoriteBorderRounded
                  onClick={(event) => {
                    event.stopPropagation();
                    setLike(!like);
                  }}
                />
              )}
              <p style={{ marginTop: 2 }}>{like ? '31' : '30'}</p>
            </div>
            <div style={{ padding: 5 }}>
              <div className={styles.nameContainer}>
                <p className={styles.name}>{item.title}</p>
              </div>
              <p className={styles.time}>{relativeTime(item.createdAt)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
