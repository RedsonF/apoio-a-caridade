/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import {
  getStates,
  getCitys,
  getStateByName,
  getCityByName,
} from 'util/locations';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Form from 'components/Form';
import Select from 'components/Select';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import { updatePreferences, getDonor } from 'services/donorService';

import styles from './styles.module.css';

export default function Preferences() {
  const { user } = useContext(AuthContext);
  const { _id: id } = user;
  const states = getStates();
  const [state, setState] = useState({ value: -1, label: 'Todas' });
  const [citys, setCitys] = useState([]);
  const [city, setCity] = useState({ value: -1, label: 'Todas' });
  const [types, setTypes] = useState([
    { value: 'beneficente', label: 'Entidades beneficentes', selected: false },
    { value: 'instituto', label: 'Institutos', selected: false },
    { value: 'ong', label: 'ONGs', selected: false },
  ]);
  const typesSelected = types
    .filter((type) => type.selected)
    .map((type) => type.value);

  const isClearable = (value) => value !== -1;

  const initPreferences = async (preferences) => {
    if (preferences.state) {
      const newState = getStateByName(preferences.state);
      const { newCitys } = await getCitys(newState.value);
      setState(newState);
      setCitys(newCitys);

      if (preferences.city) {
        const newCity = await getCityByName(preferences.city, newCitys);
        setCity(newCity);
      }
    }

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
    initPreferences(newDonor.preferences);
  }, []);

  const changeCity = (location) => {
    const value = location?.value ?? -1;
    const label = location?.label ?? 'Todas';

    setCity({ value, label });
  };

  const changeState = async (location) => {
    const value = location?.value ?? -1;
    const label = location?.label ?? 'Todas';

    setState({ value, label });
    const { newCitys, newCity } = await getCitys(value);

    setCitys(newCitys);
    changeCity(newCity);
  };

  const changeTypes = (index) => {
    const list = [...types];
    list[index].selected = !list[index].selected;

    setTypes(list);
  };

  const submit = () => {
    const body = {
      state: state.label,
      city: city.label,
      typesOfInstitution: typesSelected,
    };

    updatePreferences(body, id);
  };

  return (
    <AnimatedPage>
      <Header title="Configurações" path="/donor/options" />
      <div className="content">
        <p className={styles.title}>Preferências</p>
        <div style={{ marginTop: 30, marginBottom: 10 }}>
          <p>
            Defina os valores padrões dos filtros de acordo com sua preferência
          </p>
        </div>
        <Form>
          <Select
            value={state}
            onChange={changeState}
            options={states}
            isClearable={isClearable(state.value)}
            label="Estado das instituições"
          />
          <Select
            value={city}
            onChange={changeCity}
            options={citys}
            isClearable={isClearable(city.value)}
            label="Cidade das instituições"
          />
          <div style={{ marginTop: 10 }} />
          <Checkbox
            checked={types[0].selected}
            value={types[0].selected}
            onChange={() => changeTypes(0)}
            label="Entidades beneficentes"
          />
          <Checkbox
            checked={types[2].selected}
            value={types[2].selected}
            onChange={() => changeTypes(2)}
            label="Institutos"
          />
          <Checkbox
            checked={types[3].selected}
            value={types[3].selected}
            onChange={() => changeTypes(3)}
            label="ONGs"
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
