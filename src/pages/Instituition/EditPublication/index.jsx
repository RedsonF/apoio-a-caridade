import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import PublicationForm from 'components/PublicationForm';
import {
  updatePublication,
  getPublicationById,
} from 'services/publicationService';

export default function EditPublication() {
  const { id: idPublication } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [invaliditys, setInvaliditys] = useState({
    name: '',
  });
  const data = {
    title,
    description,
    images,
    invaliditys,
  };

  const init = async (publication) => {
    const {
      title: newTitle,
      description: newDescription,
      images: newImages,
    } = publication;
    setTitle(newTitle);
    setDescription(newDescription);
    setImages(newImages);
  };

  useEffect(async () => {
    const publication = await getPublicationById(idPublication);
    init(publication);
  }, []);

  const submit = async () => {
    const updated = updatePublication(title, description, idPublication);
    if (updated) {
      navigate(`/institution/publication/${idPublication}`);
    }
  };

  return (
    <AnimatedPage>
      <Header
        title="Editar Publicação"
        path={`/institution/publication/${idPublication}`}
      />
      <div className="content">
        <PublicationForm
          data={data}
          setTitle={(value) => setTitle(value)}
          setDescription={(value) => setDescription(value)}
          setInvaliditys={(value) => setInvaliditys(value)}
          submit={() => submit()}
        />
      </div>
    </AnimatedPage>
  );
}
