import React, { useContext, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import DefaultModal from 'components/DefaultModal';

import styles from './styles.module.css';

export default function Options() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const navigateToPreferences = () => {
    navigate('/donor/preferences');
  };

  const navigateToGuide = () => {
    navigate('/donor/guide');
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
      <Header title="Opções" />
      <div className="centralizedContent">
        {modal()}
        <div className={styles.options}>
          <div onClick={() => navigateToPreferences()}>
            <p>Preferências</p>
          </div>
          <div onClick={() => navigateToGuide()}>
            <p>Guia</p>
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
