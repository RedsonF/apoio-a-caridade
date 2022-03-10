import React from 'react';
import CustomModal from 'components/CustomModal';

import styles from './styles.module.css';

const Modal = ({
  donateModal,
  changeDonateModal,
  donationData,
  logoImage,
  name,
}) => {
  const { pix, bankData } = donationData;

  return (
    <CustomModal
      open={donateModal}
      changeModal={() => changeDonateModal()}
      maxWidth="410px"
    >
      <div className={styles.container}>
        <p className={styles.title}>Doação</p>
        <section className={styles.line} />
        <div className={styles.img}>
          <img alt="imagem" src={logoImage} />
        </div>
        <p className={styles.name}>{name}</p>
        <div className={styles.box}>
          <div>
            <p>PIX</p>
            <p className={styles.gray}>{pix || '-'}</p>
          </div>

          <div className={styles.margin}>
            <p>BANCO</p>
            <p className={styles.gray}>{bankData?.bank || '-'}</p>
            <p>AGÊNCIA</p>
            <p className={styles.gray}>{bankData?.branch || '-'}</p>
            <p>CONTA</p>
            <p className={styles.gray}>{bankData?.account || '-'}</p>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default Modal;
