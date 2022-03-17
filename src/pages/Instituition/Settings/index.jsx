/* eslint-disable no-unused-vars */

import React, { useContext, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import DefaultModal from 'components/DefaultModal';

import styles from './styles.module.css';

export default function Settings() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const navigateToSettingsName = () => {
    navigate('/institution/settings/name');
  };

  const navigateToSettingsLocation = () => {
    navigate('/institution/settings/location');
  };

  const navigateToSettingsImages = () => {
    navigate('/institution/settings/images');
  };

  const navigateToSettingsBankData = () => {
    navigate('/institution/settings/bank-data');
  };

  const logoutAction = () => {
    logout();
    setOpenModal(false);
  };

  const modal = () => (
    <DefaultModal
      open={openModal}
      changeModal={() => setOpenModal(!openModal)}
      confirm={() => logoutAction()}
      title="Sair da conta"
      text="Tem certeza que deseja sair da conta?"
    />
  );

  return (
    <AnimatedPage>
      <Header title="Configurações" />
      <div className="centralizedContent">
        {modal()}

        <div className={styles.options}>
          <div onClick={() => navigateToSettingsName()}>
            <p>Dados básicos</p>
          </div>
          <div onClick={() => navigateToSettingsBankData()}>
            <p>Dados para doação</p>
          </div>
          <div onClick={() => navigateToSettingsLocation()}>
            <p>Localização</p>
          </div>
          <div onClick={() => navigateToSettingsImages()}>
            <p>Imagens</p>
          </div>
          <div onClick={() => setOpenModal(true)} className={styles.last}>
            <LogoutRoundedIcon />
            <p>Sair</p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
