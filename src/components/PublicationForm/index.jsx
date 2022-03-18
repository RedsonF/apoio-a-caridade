/* eslint-disable no-unused-vars */
import React from 'react';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Form from 'components/Form';
import Input from 'components/Input';
import Button from 'components/Button';
import Carousel from 'components/Carousel';
import { validateGeneric } from 'util/validate';

import styles from './styles.module.css';

export default function PublicationForm({
  data,
  setImages,
  setImageUrl,
  setTitle,
  setDescription,
  setInvaliditys,
  submit,
  removeMode,
}) {
  const imgButton = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    background: 'var(--blue)',
    padding: 4,
    borderRadius: 8,
    color: 'var(--white)',
    width: 230,
    marginBottom: 10,
  };

  const { images, title, description, invaliditys } = data;

  const changeTitle = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const changeDescription = (e) => {
    const { value } = e.target;
    setDescription(value);
  };

  const validate = () => {
    const newInvaliditys = {};

    newInvaliditys.images =
      images.length === 0 ? 'Adicione pelo menos 1 imagem' : '';
    newInvaliditys.title = validateGeneric(title, 'Informe o título');
    newInvaliditys.description = validateGeneric(
      description,
      'Informe a descrição'
    );

    setInvaliditys(newInvaliditys);

    const test = Object.values(newInvaliditys);
    const validated = !test.find((inv) => inv !== '');

    return validated;
  };

  const action = () => {
    if (validate()) {
      submit();
    }
  };

  const changeImage = (event) => {
    const { files } = event.target;
    if (files) {
      if (files.length !== 0) {
        const file = files[0];
        const newImages = [...images, file];
        file.url = URL.createObjectURL(file);

        setImages(newImages);
        setImageUrl('');
      }
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const buttonImage = () => (
    <label style={{ cursor: 'pointer' }} htmlFor="button-image">
      <input
        disabled={images.length === 5}
        type="file"
        accept="image/*"
        id="button-image"
        onChange={(e) => changeImage(e)}
        className={styles.hidden}
      />
      <div style={imgButton}>
        ADICIONAR IMAGEM {images.length}/5
        <PhotoCameraIcon className={styles.icon} />
      </div>
    </label>
  );

  return (
    <>
      <Carousel
        images={images}
        removeImage={(value) => removeImage(value)}
        removeMode={removeMode}
      />
      {removeMode ? (
        <>
          <p className={styles.error}>{invaliditys.images}</p>
          <div className={styles.buttonImageContainer}>{buttonImage()}</div>
        </>
      ) : (
        <div style={{ marginBottom: 10 }} />
      )}

      <Form>
        <Input
          value={title}
          onChange={changeTitle}
          label="Título*"
          error={invaliditys.title}
        />
        <Input
          value={description}
          onChange={changeDescription}
          type="textarea"
          label="Descrição*"
          error={invaliditys.description}
        />
      </Form>
      <Button onClick={() => action()} style={{ width: '100%', marginTop: 20 }}>
        {removeMode ? 'PUBLICAR' : 'SALVAR'}
      </Button>
    </>
  );
}
