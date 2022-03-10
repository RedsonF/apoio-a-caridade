import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { updateInstitution, getInstitution } from 'services/institutionService';
import {
  getStates,
  getCitys,
  getStateByName,
  getCityByName,
} from 'util/locations';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Form from 'components/Form';
import Input from 'components/Input';
import Select from 'components/Select';
import Button from 'components/Button';
import { validateGeneric } from 'util/validate';

import styles from './styles.module.css';

export default function SettingsLocalization() {
  const { user } = useContext(AuthContext);
  const { _id: id } = user;
  const states = getStates(false);
  const [state, setState] = useState('');
  const [citys, setCitys] = useState([]);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [invaliditys, setInvaliditys] = useState({
    state: '',
    city: '',
    address: '',
  });
  const isClearable = (value) => value !== -1;

  const init = async (location) => {
    const newState = getStateByName(location.state);
    const { newCitys } = await getCitys(newState.value);
    const newCity = await getCityByName(location.city, newCitys);

    setState(newState);
    setCitys(newCitys);
    setCity(newCity);
    setAddress(location.address);
  };

  useEffect(async () => {
    const { institution } = await getInstitution(id);
    init(institution.location);
  }, []);

  const changeCity = (location) => {
    if (location) {
      const { value, label } = location;
      setCity({ value, label });
    } else {
      setCity('');
    }
  };

  const changeState = async (location) => {
    if (location) {
      const { value, label } = location;

      setState({ value, label });

      const { newCitys, newCity } = await getCitys(value, false);

      setCitys(newCitys);
      changeCity(newCity);
    } else {
      setState('');
      setCitys([]);
      setCity('');
    }
  };

  const changeAddress = (e) => {
    const { value } = e.target;
    setAddress(value);
  };

  const validate = () => {
    const newInvaliditys = {};

    newInvaliditys.state = validateGeneric(state.label, 'Informe o estado!');
    newInvaliditys.city = validateGeneric(city.label, 'Informe a cidade!');
    newInvaliditys.address = validateGeneric(address, 'Informe o endereço!');

    setInvaliditys(newInvaliditys);

    const test = Object.values(newInvaliditys);
    const validated = !test.find((inv) => inv !== '');

    return validated;
  };

  const submit = () => {
    if (validate()) {
      const location = {
        state: state.label,
        city: city.label,
        address,
      };
      updateInstitution({ location }, id);
    }
  };

  return (
    <AnimatedPage>
      <Header title="Configurações" path="/institution/settings" />
      <div className="centralizedContent">
        <p className={styles.title}>Localização</p>
        <Form>
          <Select
            value={state}
            onChange={changeState}
            options={states}
            label="Estado"
            isClearable={isClearable(state.value)}
            error={invaliditys.state}
          />
          <Select
            value={city}
            onChange={changeCity}
            options={citys}
            label="Cidade"
            isClearable={isClearable(city.value)}
            error={invaliditys.city}
          />
          <Input
            value={address}
            onChange={changeAddress}
            label="Endereço"
            error={invaliditys.address}
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
