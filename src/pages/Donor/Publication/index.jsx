/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from 'services/api';
import Swal from 'sweetalert2';
import { relativeTime } from 'util/conversor';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Carousel from 'components/Carousel';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import { likePublication } from 'services/publicationService';
import LogoImage from 'components/LogoImage';

import styles from './styles.module.css';

const Publication = () => {
  const { user } = useContext(AuthContext);
  const { _id: idUser } = user;
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [publication, setPublication] = useState({});
  const [institution, setInstitution] = useState({});
  const [images, setImages] = useState([]);
  const { title, description, createdAt, idInstitution, likes } = publication;

  const { imageInstitution, nameInstitution } = institution;

  const getPublication = async () => {
    try {
      const { data } = await api.get(`/publication/${id}`);
      const { publication: newPublication, institution: newInstitution } = data;
      setPublication(newPublication);
      setImages(newPublication.images);
      setInstitution(newInstitution);
    } catch (err) {
      const { msg } = err.response?.data || '';
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro',
        text: msg,
      });
    }
  };

  useEffect(() => {
    getPublication();
  }, []);

  const navigateToInstitution = () => {
    navigate(`/donor/institution/${idInstitution}`, {
      state: {
        back: `/donor/publication/${id}`,
      },
    });
  };

  const likePub = async (like) => {
    const newPublication = { ...publication };

    if (like) {
      newPublication.likes.push(idUser);
    } else {
      const index = publication.likes.indexOf(idUser);
      newPublication.likes.splice(index, 1);
    }
    setPublication(newPublication);

    await likePublication(id, idUser, like);
    getPublication();
  };

  return (
    <AnimatedPage>
      <Header title="Publicação" path={state?.back || '/donor/feed'} />
      <div className="content">
        <div className={styles.instituition}>
          <LogoImage image={imageInstitution} size="small" />
          <div className={styles.info}>
            <p onClick={() => navigateToInstitution()} className={styles.name}>
              {nameInstitution}
            </p>
            <p className={styles.time}>{relativeTime(createdAt)}</p>
          </div>
        </div>
        <Carousel images={images} />
        <div className={styles.like}>
          {likes?.includes(user?._id) ? (
            <FavoriteRoundedIcon
              style={{ fontSize: 28 }}
              onClick={(event) => {
                event.stopPropagation();
                likePub(false);
              }}
            />
          ) : (
            <FavoriteBorderRounded
              style={{ fontSize: 28 }}
              onClick={(event) => {
                event.stopPropagation();
                likePub(true);
              }}
            />
          )}
          <p style={{ marginTop: 2 }}>{likes?.length}</p>
        </div>
        <div style={{ padding: 5 }}>
          <div style={{ marginTop: 10 }}>
            <p className={styles.title}>{title}</p>
          </div>

          <div style={{ marginTop: 20 }}>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Publication;
