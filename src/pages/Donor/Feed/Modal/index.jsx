import React from 'react';
import CustomModal from 'components/CustomModal';
import Input from 'components/Input';
import Button from 'components/Button';

import styles from './styles.module.css';

const Modal = ({ filterModal, changeFilterModal }) => (
  <CustomModal
    open={filterModal}
    changeModal={() => changeFilterModal()}
    maxWidth="410px"
  >
    <div className={styles.container}>
      <p className={styles.title}>Filtros</p>
      <section className={styles.line} />
      <div className={styles.form}>
        <Input label="Data da publicação" type="date" />
        <Button style={{ marginTop: 20 }} small>
          FILTRAR
        </Button>
      </div>
    </div>
  </CustomModal>
);

export default Modal;
