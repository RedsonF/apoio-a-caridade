/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import AnimatedPage from 'animation/AnimatedPage';
import api from 'services/api';
import Swal from 'sweetalert2';
import Header from 'components/Header';
import ImageIcon from '@mui/icons-material/Image';
import styles from './styles.module.css';

export default function HomeInstituition() {
  const { user } = useContext(AuthContext);

  const [institution, setInstitution] = useState({});
  const [publications, setPublications] = useState({});
  const { name, location, description } = institution;

  useEffect(async () => {
    try {
      const { data } = await api.get(`/institution/${user?._id}`);
      const { institution: newInstitution, publications: newPublications } =
        data;
      setInstitution(newInstitution);
      setPublications(newPublications);
    } catch (err) {
      const { msg } = err.response?.data || '';
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro',
        text: msg,
      });
    }
  }, []);

  return (
    <AnimatedPage>
      <Header title="Início" />
      <div className="tightContent">
        <div className={styles.img}>
          <div className={styles.logo}>
            <img alt="imagem" loading="lazy" src={institution.logoImage} />
          </div>
          <div className={styles.publications}>
            <p className={styles.bold}>{publications?.length}</p>
            <p>Publicações</p>
          </div>
        </div>
        <p className={styles.name}>{name}</p>
        <div className={styles.info}>
          <p className={styles.bold}>Localização</p>
          <p>
            {location?.address} - {location?.city} - {location?.state}
          </p>
        </div>
        <div className={styles.info}>
          <p className={styles.bold}>Sobre</p>
          <p>{description}</p>
        </div>
      </div>
    </AnimatedPage>
  );
}
