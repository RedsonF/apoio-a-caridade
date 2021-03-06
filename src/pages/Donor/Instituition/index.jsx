/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from 'services/api';
import Swal from 'sweetalert2';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Button from 'components/Button';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PublicationList from 'components/PublicationsList';
import CoverImage from 'components/CoverImage';
import { likePublication } from 'services/publicationService';
import { convertToSigla } from 'util/conversor';
import Modal from './Modal';

import styles from './styles.module.css';

const Instituition = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [institution, setInstitution] = useState({});
  const [publications, setPublications] = useState([]);
  const [mode, setMode] = useState('about');
  const [donateModal, setDonateModal] = useState(false);
  const [donationData, setDonationData] = useState({});
  const { name, description, location, coverImage, logoImage } = institution;

  const getInstitution = async () => {
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
        title: 'Ocorreu um erro',
        text: msg,
      });
    }
  };

  useEffect(() => {
    getInstitution();
  }, [mode]);

  const changeDonateModal = () => {
    setDonateModal(!donateModal);
  };

  const likePub = async ({ id: idPub, idUser, like }) => {
    const newPublications = [...publications];
    const publication = newPublications.find((pub) => pub._id === idPub);

    if (like) {
      publication.likes.push(idUser);
    } else {
      const index = publication.likes.indexOf(idUser);
      publication.likes.splice(index, 1);
    }
    setPublications(newPublications);

    await likePublication(idPub, idUser, like);
    getInstitution();
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
      <Header title="Institui????o" path={state?.back || '/donor/home'} />
      <div className="content">
        <CoverImage image={coverImage} logo={logoImage || ''} />
        <div style={{ marginTop: 15 }}>
          <p className={styles.title}>{name}</p>
          <p>
            {location?.address} - {location?.city} -{' '}
            {convertToSigla(location?.state)}
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
            <p>Publica????es</p>
          </div>
        </div>
        {mode === 'about' ? (
          <div className={styles.display}>
            <p>{description}</p>
          </div>
        ) : (
          <PublicationList
            publications={publications}
            back={`/donor/institution/${id}`}
            likePub={(value) => likePub(value)}
            logoImage={logoImage}
          />
        )}
      </div>
    </AnimatedPage>
  );
};

export default Instituition;
