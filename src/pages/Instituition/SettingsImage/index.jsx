/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { getInstitution, imageInstitution } from 'services/institutionService';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import styles from './styles.module.css';

const styleButton = {
  position: 'absolute',
  background: 'var(--blue)',
  border: '1px solid var(--borderColor)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 5,
  borderRadius: '100%',
  cursor: 'pointer',
};

const logoButton = {
  ...styleButton,
  right: 0,
  bottom: 0,
};

const imgButton = {
  ...styleButton,
  right: 5,
  top: 5,
};

export default function SettingsImage() {
  const { user } = useContext(AuthContext);
  const { _id: id } = user;
  const [image, setImage] = useState({});
  const [logo, setLogo] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const init = async (institution) => {
    const { coverImage, logoImage } = institution;
    setImageUrl(coverImage);
    setLogoUrl(logoImage);
  };

  useEffect(async () => {
    const { institution } = await getInstitution(id);
    init(institution);
  }, []);

  const changeImage = (event, type = 'image') => {
    const { files } = event.target;
    if (files) {
      if (files.length !== 0) {
        const file = files[0];
        const newUrl = URL.createObjectURL(file);
        if (type === 'logo') {
          setLogo(file);
          setLogoUrl(newUrl);
          imageInstitution(file, id, false);
        } else {
          setImage(file);
          setImageUrl(newUrl);
          imageInstitution(file, id);
        }
      }
    }
  };

  const buttonImage = () => (
    <label htmlFor="button-image">
      <input
        type="file"
        accept="image/*"
        id="button-image"
        onChange={(e) => changeImage(e)}
        className={styles.hidden}
      />
      <div style={imgButton}>
        <PhotoCameraIcon className={styles.icon} />
      </div>
    </label>
  );

  return (
    <AnimatedPage>
      <Header title="Configurações" path="/institution/settings" />
      <div className="content">
        <p className={styles.title}>Logo e Foto de Capa</p>
        <div style={{ marginTop: 30 }} />
        <div className={styles.img}>
          <img alt="imagem" src={imageUrl} />
          {buttonImage()}
        </div>
        <div className={styles.logo}>
          <img alt="Imagem" src={logoUrl} />
          <label htmlFor="button-logo">
            <input
              type="file"
              accept="image/*"
              id="button-logo"
              onChange={(e) => changeImage(e, 'logo')}
              className={styles.hidden}
            />
            <div style={logoButton}>
              <PhotoCameraIcon className={styles.icon} />
            </div>
          </label>
        </div>
      </div>
    </AnimatedPage>
  );
}
