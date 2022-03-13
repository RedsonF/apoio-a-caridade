/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from 'services/api';
import Swal from 'sweetalert2';
import { relativeTime } from 'util/conversor';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import IconButton from 'components/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import DefaultModal from 'components/DefaultModal';
import LogoImage from 'components/LogoImage';
import Carousel from 'components/Carousel';
import { deletePublication } from 'services/publicationService';

import styles from './styles.module.css';

const buttonStyle = {
  background: 'var(--blue)',
  borderRadius: 8,
};

const Publication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [publication, setPublication] = useState({});
  const [institution, setInstitution] = useState({});
  const [images, setImages] = useState([]);
  const { title, description, createdAt, likes } = publication;
  const [openModal, setOpenModal] = useState(false);

  const { imageInstitution, nameInstitution } = institution;

  useEffect(async () => {
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
  }, []);

  const navigateToHome = () => {
    navigate('/institution/home');
  };

  const navigateToEditPublication = () => {
    navigate(`/institution/edit-publication/${id}`);
  };

  const deletePub = async () => {
    setOpenModal(false);
    const deleted = await deletePublication(id);
    if (deleted) {
      navigate('/institution/publications');
    }
  };

  const modal = () => (
    <DefaultModal
      open={openModal}
      changeModal={() => setOpenModal(!openModal)}
      confirm={() => deletePub()}
      title="Excluir publicação"
      text="Tem certeza que deseja excluir essa publicação?"
    />
  );

  return (
    <AnimatedPage>
      <Header title="Publicação" path="/institution/publications" />
      <div className="content">
        {modal()}
        <div className={styles.buttons}>
          <IconButton onClick={() => setOpenModal(true)} style={buttonStyle}>
            <DeleteRoundedIcon className={styles.icon} />
          </IconButton>
          <IconButton
            onClick={() => navigateToEditPublication()}
            style={buttonStyle}
          >
            <EditRoundedIcon className={styles.icon} />
          </IconButton>
        </div>

        <div className={styles.instituition}>
          <LogoImage image={imageInstitution} size="small" />
          <div className={styles.info}>
            <p onClick={() => navigateToHome()} className={styles.name}>
              {nameInstitution}
            </p>
            <p className={styles.time}>{relativeTime(createdAt)}</p>
          </div>
        </div>

        <Carousel images={images} />

        <div className={styles.like}>
          <FavoriteRoundedIcon style={{ fontSize: 28 }} />
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
