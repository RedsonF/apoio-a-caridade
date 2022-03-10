import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '../IconButton';

export default function CustomModal({ children, open, changeModal, maxWidth }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: maxWidth || 360,
    backgroundColor: 'var(--white)',
    borderRadius: '6px',
    padding: '10px',
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
        {children}
      </Box>
    </Modal>
  );
}
