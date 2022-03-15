/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from 'services/api';
import Swal from 'sweetalert2';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Input from 'components/Input';
import Button from 'components/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LogoImage from 'components/LogoImage';
import SearchIcon from '@mui/icons-material/Search';
import {
  getStates,
  getCitys,
  getStateByName,
  getCityByName,
} from 'util/locations';
import { getDonor } from 'services/donorService';
import Modal from './Modal';

import styles from './styles.module.css';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { _id: id } = user;

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [instituitions, setInstituitions] = useState([]);
  const [filterModal, setFilterModal] = useState(false);
  const states = getStates();
  const [state, setState] = useState({ value: -1, label: 'Todos' });
  const [citys, setCitys] = useState([]);
  const [city, setCity] = useState({ value: -1, label: 'Todas' });
  const [types, setTypes] = useState([
    { value: 'beneficentes', label: 'Entidades beneficentes', selected: false },
    { value: 'fundações', label: 'Fundações', selected: false },
    { value: 'institutos', label: 'Institutos', selected: false },
    { value: 'ongs', label: 'ONGs', selected: false },
  ]);

  const isClearable = (value) => value !== -1;

  const data = {
    states,
    state,
    citys,
    city,
    types,
    isClearable,
  };

  const getInstitutions = async () => {
    setFilterModal(false);
    const newState = state.value !== -1 ? state.label : '';
    const newCity = city.value !== -1 ? city.label : '';
    try {
      const { data: newData } = await api.get('/institution', {
        params: {
          name: search,
          state: newState,
          city: newCity,
          beneficente: types[0].selected,
          fundacao: types[1].selected,
          instituto: types[2].selected,
          ong: types[3].selected,
        },
      });
      setInstituitions(newData);
    } catch (err) {
      const { msg } = err.response?.data || '';
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro',
        text: msg,
      });
    }
  };

  const initPreferences = async (preferences) => {
    const newState = getStateByName(preferences.state);
    const { newCitys } = await getCitys(newState.value);
    const newCity = await getCityByName(preferences.city, newCitys);

    setState(newState);
    setCitys(newCitys);
    setCity(newCity);

    const newTypes = types.map((type) => {
      const newType = { ...type };
      if (preferences.typesOfInstitution.includes(newType.value)) {
        newType.selected = true;
      }
      return newType;
    });

    setTypes(newTypes);
  };

  useEffect(async () => {
    const newDonor = await getDonor(id);
    await initPreferences(newDonor.preferences);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      getInstitutions();
    }
  }, [search, loading]);

  const changeSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const changeFilterModal = () => {
    setFilterModal(!filterModal);
  };

  const navigateToInstitution = (idInstitution) => {
    navigate(`/donor/institution/${idInstitution}`);
  };

  return (
    <AnimatedPage>
      <Modal
        filterModal={filterModal}
        changeFilterModal={changeFilterModal}
        data={data}
        setState={(value) => setState(value)}
        setCity={(value) => setCity(value)}
        setCitys={(value) => setCitys(value)}
        setTypes={(value) => setTypes(value)}
        getInstitutions={() => getInstitutions()}
      />
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
