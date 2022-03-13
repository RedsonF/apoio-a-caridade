import React, { useState, useEffect } from 'react';
import api from 'services/api';
import Swal from 'sweetalert2';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Input from 'components/Input';
import Button from 'components/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PublicationsList from 'components/PublicationsList';
import SearchIcon from '@mui/icons-material/Search';
import { likePublication } from 'services/publicationService';
import Modal from './Modal';

export default function Feed() {
  const [search, setSearch] = useState('');
  const [publications, setPublications] = useState([]);
  const [filterModal, setFilterModal] = useState(false);

  const getPublications = async () => {
    try {
      const { data } = await api.get('/publication');
      setPublications(data);
    } catch (err) {
      const { msg } = err.response?.data || '';
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro',
        text: msg,
      });
    }
  };

  useEffect(() => {
    getPublications();
  }, []);

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
      <Modal filterModal={filterModal} changeFilterModal={changeFilterModal} />
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
