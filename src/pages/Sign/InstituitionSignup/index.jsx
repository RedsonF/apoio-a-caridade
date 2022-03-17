import React, { useState, useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getStates, getCitys } from 'util/locations';
import AnimatedPage from 'animation/AnimatedPage';
import SignTemplate from 'components/SignTemplate';
import Form from 'components/Form';
import Input from 'components/Input';
import InputMask from 'components/InputMask';
import Select from 'components/Select';
import Button from 'components/Button';
import { signup } from 'services/institutionService';
import {
  validateEmail,
  validatePassword,
  validateGeneric,
} from 'util/validate';
import { stripCnpj } from 'util/conversor';

import styles from './styles.module.css';

export default function InstituitionSignup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const states = getStates(false);
  const [state, setState] = useState('');
  const [citys, setCitys] = useState([]);
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const types = [
    { value: 'beneficente', label: 'Entidade beneficente' },
    { value: 'fundação', label: 'Fundação' },
    { value: 'instituto', label: 'Instituto' },
    { value: 'ong', label: 'ONG' },
  ];
  const [type, setType] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [invaliditys, setInvaliditys] = useState({
    email: '',
    password: '',
    state: '',
    city: '',
    name: '',
    address: '',
    type: '',
    cnpj: '',
  });

  const isClearable = (value) => value !== -1;

  const changeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const changeName = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const changePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

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

  const changeType = (newType) => {
    if (newType) {
      const { value, label } = newType;
      setType({ value, label });
    } else {
      setType('');
    }
  };

  const changeCnpj = (e) => {
    const { value } = e.target;
    setCnpj(value);
  };

  const navigateToLogin = () => {
    navigate('/');
  };

  const validate = () => {
    const newInvaliditys = {};

    newInvaliditys.name = validateGeneric(
      name,
      'Informe o nome da instituição'
    );
    newInvaliditys.email = validateEmail(email);
    newInvaliditys.password = validatePassword(password);
    newInvaliditys.state = validateGeneric(
      state.label || '',
      'Informe o estado'
    );
    newInvaliditys.city = validateGeneric(city.label || '', 'Informe a cidade');
    newInvaliditys.address = validateGeneric(address, 'Informe o endereço');
    newInvaliditys.type = validateGeneric(
      type,
      'Informe o tipo de instituição'
    );

    const newCnpj = stripCnpj(cnpj);
    newInvaliditys.cnpj = newCnpj.length === 13 ? '' : 'Informe o CNPJ';

    setInvaliditys(newInvaliditys);

    const test = Object.values(newInvaliditys);
    const validated = !test.find((inv) => inv !== '');

    return validated;
  };

  const submit = async () => {
    if (validate()) {
      const res = await signup(
        name,
        email,
        password,
        state.label,
        city.label,
        address,
        type.value,
        cnpj
      );
      if (res) {
        login(email, password);
      }
    }
  };

  return (
    <AnimatedPage>
      <SignTemplate>
        <div>
          <Form gap={10} transparent>
            <Input
              value={name}
              onChange={changeName}
              placeholder="Nome da Instituição*"
              error={invaliditys.name}
            />
            <Input
              value={email}
              onChange={changeEmail}
              type="email"
              placeholder="Email*"
              error={invaliditys.email}
            />
            <Input
              value={password}
              onChange={changePassword}
              type="password"
              placeholder="Senha*"
              error={invaliditys.password}
            />
            <Select
              value={state}
              onChange={changeState}
              options={states}
              placeholder="Estado*"
              isClearable={isClearable(state.value)}
              error={invaliditys.state}
            />
            <Select
              value={city}
              onChange={changeCity}
              options={citys}
              placeholder="Cidade*"
              isClearable={isClearable(city.value)}
              error={invaliditys.city}
            />
            <Input
              value={address}
              onChange={changeAddress}
              placeholder="Endereço*"
              error={invaliditys.address}
            />
            <Select
              value={type}
              onChange={changeType}
              options={types}
              placeholder="Tipo de Instituição*"
              isClearable={isClearable(type.value)}
              error={invaliditys.type}
            />
            <InputMask
              value={cnpj}
              onChange={changeCnpj}
              placeholder="CNPJ*"
              error={invaliditys.cnpj}
            />
          </Form>
          <Button
            onClick={() => submit()}
            style={{ width: '100%', marginTop: 20 }}
          >
            cadastrar
          </Button>
          <div className={styles.text}>
            <p>Já possui uma conta?</p>
            <p onClick={() => navigateToLogin()} className={styles.link}>
              Entre
            </p>
          </div>
        </div>
      </SignTemplate>
    </AnimatedPage>
  );
}
