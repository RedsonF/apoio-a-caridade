/* eslint-disable no-unused-vars */
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from 'components/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from 'components/Button';
import styles from './styles.module.css';

export default function DefaultModal({
  title,
  text,
  open,
  changeModal,
  confirm,
  maxWidth,
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: maxWidth || 360,
    backgroundColor: 'var(--white)',
    borderRadius: '6px',
    padding: '20px',
  };

  const styleButton = {
    position: 'absolute',
    right: -12,
    top: -12,
    backgroundColor: 'var(--red)',
    color: 'var(--white)',
  };

  return (
    <Modal open={open} onClose={() => changeModal()}>
      <Box sx={style}>
        <IconButton onClick={() => changeModal()} style={styleButton}>
          <CloseIcon />
        </IconButton>
        <div className={styles.title}>
          <p>{title}</p>
        </div>
        <section className={styles.line} />
        <div className={styles.text}>
          <p>{text}</p>
        </div>
        <section className={styles.line} />
        <div className={styles.buttons}>
          <Button onClick={() => changeModal()} red small>
            Cancelar
          </Button>
          <Button onClick={() => confirm()} small>
            Confirmar
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
