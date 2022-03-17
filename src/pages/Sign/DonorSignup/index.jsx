import React, { useState, useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from 'animation/AnimatedPage';
import SignTemplate from 'components/SignTemplate';
import Form from 'components/Form';
import Input from 'components/Input';
import Button from 'components/Button';
import { signup } from 'services/donorService';
import { validateEmail, validatePassword } from 'util/validate';

import styles from './styles.module.css';

const DonorSignup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invaliditys, setInvaliditys] = useState({
    email: '',
    password: '',
  });

  const changeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const changePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const navigateToLogin = () => {
    navigate('/');
  };

  const validate = () => {
    const newInvaliditys = {};

    newInvaliditys.email = validateEmail(email);
    newInvaliditys.password = validatePassword(password);

    setInvaliditys(newInvaliditys);

    const test = Object.values(newInvaliditys);
    const validated = !test.find((inv) => inv !== '');

    return validated;
  };

  const submit = async () => {
    if (validate()) {
      const res = await signup(email, password);
      if (res) {
        login(email, password);
      }
    }
  };

  return (
    <AnimatedPage>
      <SignTemplate>
        <>
          <div className={styles.form}>
            <Form gap={10} transparent>
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
            </Form>
            <Button
              onClick={() => submit()}
              style={{ width: '100%', marginTop: 20 }}
            >
              cadastrar
            </Button>
          </div>
          <div className={styles.text}>
            <p>Já possui uma conta?</p>
            <p onClick={() => navigateToLogin()} className={styles.link}>
              Entre
            </p>
          </div>
        </>
      </SignTemplate>
    </AnimatedPage>
  );
};

export default DonorSignup;
