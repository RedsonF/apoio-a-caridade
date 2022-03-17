import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from 'animation/AnimatedPage';
import SignTemplate from 'components/SignTemplate';
import Button from 'components/Button';
import styles from './styles.module.css';

const PreSignup = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/');
  };

  const navigateToDonorSignup = () => {
    navigate('/donor-signup');
  };

  const navigateToInstituitionSignup = () => {
    navigate('/instituition-signup');
  };
  return (
    <AnimatedPage>
      <SignTemplate>
        <>
          <div className={styles.form}>
            <div>
              <p>
                Cadastre-se como doador para ter acesso as instituições do
                sistema
              </p>
              <Button
                onClick={() => navigateToDonorSignup()}
                style={{ width: '100%', marginTop: 20 }}
              >
                cadastre-se como doador
              </Button>
            </div>
            <div style={{ marginTop: 20 }}>
              <p>
                Cadastre sua instituição no sistema para que os doadores possam
                vê-lo
              </p>
              <Button
                onClick={() => navigateToInstituitionSignup()}
                style={{ width: '100%', marginTop: 20 }}
              >
                cadastre sua instituição
              </Button>
            </div>
          </div>
          <div className={styles.text}>
            <p>Já possui uma conta?</p>
            <p onClick={() => navigateToLogin()} className={styles.link}>
              Entre
            </p>
          </div>
        </>
      </SignTemplate>
    </AnimatedPage>
  );
};

export default PreSignup;
