/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'services/api';
import Swal from 'sweetalert2';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Input from 'components/Input';
import Button from 'components/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LogoImage from 'components/LogoImage';
import ImageIcon from '@mui/icons-material/Image';
import SearchIcon from '@mui/icons-material/Search';

import Modal from './Modal';

import styles from './styles.module.css';

export default function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [instituitions, setInstituitions] = useState([]);
  const [filterModal, setFilterModal] = useState(false);

  useEffect(async () => {
    try {
      const { data } = await api.get('/institution');
      setInstituitions(data);
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

  const changeFilterModal = () => {
    setFilterModal(!filterModal);
  };

  const navigateToInstitution = (id) => {
    navigate(`/donor/institution/${id}`);
  };

  return (
    <AnimatedPage>
      <Modal filterModal={filterModal} changeFilterModal={changeFilterModal} />
      <Header title="Início" />
      <div className="content">
        <div style={{ marginTop: 10 }}>
          <Input value={search} onChange={changeSearch} icon={<SearchIcon />} />
        </div>
        <div style={{ marginTop: 15 }}>
          <Button
            onClick={() => changeFilterModal()}
            icon={<FilterAltIcon style={{ fontSize: 16 }} />}
            small
          >
            filtros
          </Button>
        </div>
        <div style={{ marginTop: 20 }}>
          <p className={styles.title}>Instituições</p>
        </div>
        <div className={styles.list}>
          {instituitions.map((item) => (
            <div
              onClick={() => navigateToInstitution(item._id)}
              className={styles.card}
              key={item._id}
            >
              <LogoImage image={item.logoImage} />
              <div className={styles.text}>
                <span className={styles.name}>{item.name}</span>
                <p>
                  {item.location.city} - {item.location.state}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}
