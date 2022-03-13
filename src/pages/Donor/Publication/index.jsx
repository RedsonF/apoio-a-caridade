/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from 'services/api';
import Swal from 'sweetalert2';
import { relativeTime } from 'util/conversor';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Carousel from 'components/Carousel';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import LogoImage from 'components/LogoImage';

import styles from './styles.module.css';

const text = `#humanização - Profissionais do Hospital Oceânico Gilson Cantarino, em Niterói, se uniram e compraram palavras cruzadas e caça palavras para doar aos pacientes que estão internados na unidade. A intenção - além de ajudar a passar o tempo - é reduzir a ansiedade, atualizar o pensamento e melhorar a orientação espacial do paciente.
    
#Saude #SomosVivaRio #HospitalOceanico`;

const Publication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [publication, setPublication] = useState({});
  const [institution, setInstitution] = useState({});
  const [images, setImages] = useState([]);
  const { title, description, createdAt, idInstitution } = publication;

  const { imageInstitution, nameInstitution } = institution;

  useEffect(async () => {
    try {
      const { data } = await api.get(`/publication/${id}`);
      console.log(data);
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

  const navigateToInstitution = () => {
    navigate(`/donor/institution/${idInstitution}`);
  };

  console.log(imageInstitution);

  return (
    <AnimatedPage>
      <Header title="Publicação" path="/donor/feed" />
      <div className="content">
        <div className={styles.instituition}>
          <LogoImage image={imageInstitution} />
          <div className={styles.info}>
            <p onClick={() => navigateToInstitution()} className={styles.name}>
              {nameInstitution}
            </p>
            <p className={styles.time}>{relativeTime(createdAt)}</p>
          </div>
        </div>
        <Carousel images={images} />
        <div className={styles.like}>
          <FavoriteRoundedIcon /> <p style={{ marginTop: 2 }}>30</p>
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
