/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import Swal from 'sweetalert2';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Button from 'components/Button';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PublicationList from 'components/PublicationsList';
import ImageIcon from '@mui/icons-material/Image';
import Modal from './Modal';

import styles from './styles.module.css';

const Instituition = () => {
  const { id } = useParams();
  const [institution, setInstitution] = useState({});
  const [publications, setPublications] = useState([]);
  const [mode, setMode] = useState('about');
  const [donateModal, setDonateModal] = useState(false);
  const [donationData, setDonationData] = useState({});
  const { name, description, location, coverImage, logoImage } = institution;

  useEffect(async () => {
    try {
      const { data } = await api.get(`/institution/${id}`);
      const { institution: newInstitution, publications: newPublications } =
        data;
      setInstitution(newInstitution);
      setDonationData(newInstitution.donationData);
      setPublications(newPublications);
    } catch (err) {
      const { msg } = err.response?.data || '';
      Swal.fire({
        icon: 'error',
        title: `id - ${id}`,
        text: msg,
      });
    }
  }, [mode]);

  const changeDonateModal = () => {
    setDonateModal(!donateModal);
  };

  return (
    <AnimatedPage>
      <Modal
        donateModal={donateModal}
        changeDonateModal={changeDonateModal}
        donationData={donationData}
        logoImage={logoImage}
        name={name}
      />
      <Header title="Instituição" path="/donor/home" />
      <div className="content">
        <div className={styles.img}>
          <img alt="imagem" src={coverImage} />
          <div className={styles.avatar}>
            <img alt="imagem" src={logoImage} />
          </div>
        </div>
        <div style={{ marginTop: 15 }}>
          <p className={styles.title}>{name}</p>
          <p>
            {location?.address} - {location?.city} - {location?.state}
          </p>
        </div>
        <div className={styles.button}>
          <Button
            onClick={() => changeDonateModal()}
            small
            icon={<FavoriteRoundedIcon style={{ fontSize: 16 }} />}
          >
            quero doar
          </Button>
        </div>
        <div className={styles.options}>
          <div
            onClick={() => setMode('about')}
            className={mode === 'about' ? styles.aboutActive : styles.about}
          >
            <p>Sobre</p>
          </div>
          <div
            onClick={() => setMode('pub')}
            className={mode === 'pub' ? styles.pubActive : styles.pub}
          >
            <p>Publicações</p>
          </div>
        </div>
        {mode === 'about' ? (
          <div className={styles.display}>
            <p>{description}</p>
          </div>
        ) : (
          <PublicationList publications={publications} />
        )}
      </div>
    </AnimatedPage>
  );
};

export default Instituition;
