import React, { useState, useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import PublicationForm from 'components/PublicationForm';
import { addPublication } from 'services/publicationService';

export default function AddPublication() {
  const { user } = useContext(AuthContext);
  const { _id: idInstitution } = user;
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [invaliditys, setInvaliditys] = useState({
    name: '',
    description: '',
    images: '',
  });
  const data = {
    images,
    imageUrl,
    title,
    description,
    invaliditys,
  };

  const submit = async () => {
    const add = await addPublication(title, description, images, idInstitution);
    if (add) {
      navigate('/institution/publications');
    }
  };

  return (
    <AnimatedPage>
      <Header title="Adicionar Publicação" path="/institution/publications" />
      <div className="content">
        <PublicationForm
          data={data}
          setImages={(value) => setImages(value)}
          setImageUrl={(value) => setImageUrl(value)}
          setTitle={(value) => setTitle(value)}
          setDescription={(value) => setDescription(value)}
          setInvaliditys={(value) => setInvaliditys(value)}
          submit={() => submit()}
          removeMode
        />
      </div>
    </AnimatedPage>
  );
}
