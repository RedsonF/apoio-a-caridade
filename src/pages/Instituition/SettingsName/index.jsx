import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Form from 'components/Form';
import Input from 'components/Input';
import Button from 'components/Button';
import Select from 'components/Select';
import { updateInstitution, getInstitution } from 'services/institutionService';
import { validateGeneric } from 'util/validate';

import styles from './styles.module.css';

export default function SettingsName() {
  const { user } = useContext(AuthContext);
  const { _id: id } = user;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const types = [
    { value: 'beneficente', label: 'Entidade beneficente' },
    { value: 'fundação', label: 'Fundação' },
    { value: 'instituto', label: 'Instituto' },
    { value: 'ong', label: 'ONG' },
  ];
  const [invaliditys, setInvaliditys] = useState({
    name: '',
  });
  const isClearable = (value) => value !== -1;

  const init = (institution) => {
    const {
      name: newName,
      description: newDescription,
      type: newType,
    } = institution;

    setName(newName);
    setDescription(newDescription);
    const finalType = types.find((item) => item.value === newType);
    if (finalType) {
      setType(finalType);
    }
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

  const changeType = (newType) => {
    if (newType) {
      const { value, label } = newType;
      setType({ value, label });
    } else {
      setType('');
    }
  };

  const validate = () => {
    const newInvaliditys = {};

    newInvaliditys.name = validateGeneric(
      name,
      'Informe o nome da instituição'
    );
    newInvaliditys.type = validateGeneric(
      type,
      'Informe o tipo de instituição'
    );

    setInvaliditys(newInvaliditys);

    const test = Object.values(newInvaliditys);
    const validated = !test.find((inv) => inv !== '');

    return validated;
  };

  const submit = () => {
    if (validate()) {
      updateInstitution({ name, description, type: type.value }, id);
    }
  };

  return (
    <AnimatedPage>
      <Header title="Configurações" path="/institution/settings" />
      <div className="content">
        <p className={styles.title}>Dados básicos</p>
        <div style={{ marginTop: 30 }} />

        <Form>
          <Input
            value={name}
            onChange={changeName}
            label="Nome*"
            error={invaliditys.name}
          />
          <Input
            value={description}
            onChange={changeDescription}
            type="textarea"
            label="Sobre"
          />
          <Select
            value={type}
            onChange={changeType}
            options={types}
            label="Tipo de Instituição*"
            isClearable={isClearable(type.value)}
            error={invaliditys.type}
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
