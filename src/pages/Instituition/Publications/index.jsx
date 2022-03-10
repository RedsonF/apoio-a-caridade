/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from 'animation/AnimatedPage';
import api from 'services/api';
import Swal from 'sweetalert2';
import Header from 'components/Header';
import Input from 'components/Input';
import Button from 'components/Button';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ImageIcon from '@mui/icons-material/Image';
import IconButton from 'components/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PublicationsList from 'components/PublicationsList';

import styles from './styles.module.css';

const styleButton = {
  position: 'fixed',
  background: 'var(--blue)',
  right: 10,
  bottom: 70,
  height: 65,
  width: 65,
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
};

export default function Publications() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [publications, setPublications] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await api.get(`/institution/${user?._id}`);
      const { publications: newPublications } = data;
      setPublications(newPublications);
    } catch (err) {
      const { msg } = err.response?.data || '';
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro',
        text: msg,
      });
    }
  }, []);

  const changeSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const navigateToAddPublication = () => {
    navigate('/institution/add-publication');
  };

  return (
    <AnimatedPage>
      <Header title="Publicações" />
      <div className="content">
        <div style={{ marginTop: 10 }}>
          <Input
            value={search}
            onChange={changeSearch}
            icon={<SearchRoundedIcon />}
          />
        </div>
        <div style={{ marginTop: 15 }}>
          <Button
            icon={<FilterAltRoundedIcon style={{ fontSize: 16 }} />}
            small
          >
            filtros
          </Button>
        </div>
        <PublicationsList publications={publications} />
        <IconButton
          onClick={() => navigateToAddPublication()}
          style={styleButton}
        >
          <AddRoundedIcon className={styles.icon} />
        </IconButton>
      </div>
    </AnimatedPage>
  );
}
