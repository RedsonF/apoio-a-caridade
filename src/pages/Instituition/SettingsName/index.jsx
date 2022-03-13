import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Form from 'components/Form';
import Input from 'components/Input';
import Button from 'components/Button';
import { updateInstitution, getInstitution } from 'services/institutionService';
import { validateName } from 'util/validate';

import styles from './styles.module.css';

export default function SettingsName() {
  const { user } = useContext(AuthContext);
  const { _id: id } = user;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [invaliditys, setInvaliditys] = useState({
    name: '',
  });

  const init = (institution) => {
    const { name: newName, description: newDescription } = institution;

    setName(newName);
    setDescription(newDescription);
  };

  useEffect(async () => {
    const { institution } = await getInstitution(id);
    init(institution);
  }, []);

  const changeName = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const changeDescription = (e) => {
    const { value } = e.target;
    setDescription(value);
  };

  const validate = () => {
    const newInvaliditys = {};

    newInvaliditys.name = validateName(name);

    setInvaliditys(newInvaliditys);

    const test = Object.values(newInvaliditys);
    const validated = !test.find((inv) => inv !== '');

    return validated;
  };

  const submit = () => {
    if (validate()) {
      updateInstitution({ name, description }, id);
    }
  };

  return (
    <AnimatedPage>
      <Header title="Configurações" path="/institution/settings" />
      <div className="content">
        <p className={styles.title}>Nome e Descrição</p>
        <div style={{ marginTop: 30 }} />

        <Form>
          <Input
            value={name}
            onChange={changeName}
            label="Nome"
            error={invaliditys.name}
          />
          <Input
            value={description}
            onChange={changeDescription}
            type="textarea"
            label="Descrição"
          />
        </Form>
        <Button
          onClick={() => submit()}
          style={{ width: '100%', marginTop: 20 }}
        >
          SALVAR
        </Button>
      </div>
    </AnimatedPage>
  );
}
