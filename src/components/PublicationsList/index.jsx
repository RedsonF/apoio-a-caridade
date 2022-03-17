/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { relativeTime } from 'util/conversor';
import Carousel from 'components/Carousel';
import LogoImage from 'components/LogoImage';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import styles from './styles.module.css';

export default function PublicationsList({
  publications,
  likePub,
  back,
  loading,
}) {
  const navigate = useNavigate();
  const { role, user } = useContext(AuthContext);
  const showMessage =
    role === 'institution' && !loading && publications.length === 0;

  const navigateToInstitution = (id, event) => {
    event.stopPropagation();
    if (role === 'donor') {
      if (id) {
        navigate(`/donor/institution/${id}`, {
          state: {
            back: '/donor/feed',
          },
        });
      }
    } else {
      navigate('/institution/home');
    }
  };

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
          <div className={styles.instituition}>
            <LogoImage
              image={item.idInstitution.logoInstitution}
              size="small"
            />
            <div className={styles.info}>
              <p
                onClick={(event) =>
                  navigateToInstitution(item.idInstitution._id, event)
                }
                className={styles.name}
              >
                {item.idInstitution.name || item.nameInstitution}
              </p>
              <p className={styles.time}>{relativeTime(item.createdAt)}</p>
            </div>
          </div>
          <Carousel images={item.images} feed />
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
              <p className={styles.title}>{item.title}</p>
            </div>
          </div>
        </div>
      ))}
      {showMessage && (
        <p style={{ marginTop: 50, textAlign: 'center' }}>
          Sua instituição não possue nenhuma publicação
        </p>
      )}
    </div>
  );
}
