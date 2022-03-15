import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import api from 'services/api';
import Swal from 'sweetalert2';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Input from 'components/Input';
import Button from 'components/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PublicationsList from 'components/PublicationsList';
import SearchIcon from '@mui/icons-material/Search';
import {
  getStates,
  getCitys,
  getStateByName,
  getCityByName,
} from 'util/locations';
import { likePublication } from 'services/publicationService';
import { getDonor } from 'services/donorService';
import Modal from './Modal';

export default function Feed() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [publications, setPublications] = useState([]);
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

  const getPublications = async () => {
    setFilterModal(false);
    const newState = state.value !== -1 ? state.label : '';
    const newCity = city.value !== -1 ? city.label : '';
    try {
      const { data: newData } = await api.get('/publication', {
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
      setPublications(newData);
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
    const newDonor = await getDonor(user?._id);
    await initPreferences(newDonor.preferences);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      getPublications();
    }
  }, [search, loading]);

  const changeSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const changeFilterModal = () => {
    setFilterModal(!filterModal);
  };

  const likePub = async ({ id, idUser, like }) => {
    const newPublications = [...publications];
    const publication = newPublications.find((pub) => pub._id === id);

    if (like) {
      publication.likes.push(idUser);
    } else {
      const index = publication.likes.indexOf(idUser);
      publication.likes.splice(index, 1);
    }
    setPublications(newPublications);

    await likePublication(id, idUser, like);
    getPublications();
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
        getPublications={() => getPublications()}
      />
      <Header title="Feed" />
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

        <PublicationsList
          publications={publications}
          likePub={(value) => likePub(value)}
        />
      </div>
    </AnimatedPage>
  );
}
