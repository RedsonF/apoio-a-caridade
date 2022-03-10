import React from 'react';
import CustomModal from 'components/CustomModal';
import Select from 'components/Select';
import Checkbox from 'components/Checkbox';
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
        <Select label="Estado das Instituições" />
        <Select label="Cidade das Instituições" />
        <div style={{ marginTop: 10 }} />
        <Checkbox label="Entidades beneficentes" />
        <Checkbox label="Fundações" />
        <Checkbox label="Institutos" />
        <Checkbox label="ONGs" />

        <Button style={{ marginTop: 20 }} small>
          FILTRAR
        </Button>
      </div>
    </div>
  </CustomModal>
);

export default Modal;
