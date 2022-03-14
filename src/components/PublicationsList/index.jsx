/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { relativeTime } from 'util/conversor';
import Carousel from 'components/Carousel';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';

import styles from './styles.module.css';

export default function PublicationsList({ publications, likePub, back }) {
  const navigate = useNavigate();
  const { role, user } = useContext(AuthContext);

  const navigateToPublication = (id) => {
    const type = role === 'donor' ? 'donor' : 'institution';
    navigate(`/${type}/publication/${id}`, {
      state: {
        back,
      },
    });
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
          <div className={styles.like}>
            {likePub &&
              (item.likes.includes(user?._id) ? (
                <FavoriteRoundedIcon
                  style={{ fontSize: 28 }}
                  onClick={(event) => {
                    event.stopPropagation();
                    likePub({ id: item._id, idUser: user?._id, like: false });
                  }}
                />
              ) : (
                <FavoriteBorderRounded
                  style={{ fontSize: 28 }}
                  onClick={(event) => {
                    event.stopPropagation();
                    likePub({ id: item._id, idUser: user?._id, like: true });
                  }}
                />
              ))}

            {!likePub && <FavoriteRoundedIcon style={{ fontSize: 28 }} />}
            <p style={{ marginTop: 2 }}>{item.likes.length}</p>
          </div>
          <div style={{ padding: 5 }}>
            <div className={styles.nameContainer}>
              <p className={styles.name}>{item.title}</p>
            </div>
            <p className={styles.time}>{relativeTime(item.createdAt)}</p>
          </div>
        </div>
      ))}
      {publications.length === 0 && <div className={styles.line} />}
    </div>
  );
}
