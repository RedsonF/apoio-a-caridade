import React, { useState, useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from 'animation/AnimatedPage';
import SignTemplate from 'components/SignTemplate';
import Form from 'components/Form';
import Input from 'components/Input';
import Button from 'components/Button';
import { validateEmail, validatePassword } from 'util/validate';

import styles from './styles.module.css';

const Login = () => {
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

  const navigateToPreSignup = () => {
    navigate('/pre-signup');
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

  const submit = () => {
    if (validate()) {
      login(email, password);
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
                placeholder="Email"
                error={invaliditys.email}
              />
              <div>
                <Input
                  value={password}
                  onChange={changePassword}
                  type="password"
                  placeholder="Senha"
                  error={invaliditys.password}
                />
                <div className={styles.text}>
                  <p>Esqueceu sua senha?</p>
                  <p
                    onClick={() => navigateToPreSignup()}
                    className={styles.link}
                  >
                    clique aqui
                  </p>
                </div>
              </div>
            </Form>
            <Button
              onClick={() => submit()}
              style={{ width: '100%', marginTop: 20 }}
            >
              Login
            </Button>
          </div>
          <div
            className={styles.text}
            style={{
              position: 'fixed',
              bottom: 10,
            }}
          >
            <p>Não possui uma conta?</p>
            <p onClick={() => navigateToPreSignup()} className={styles.link}>
              Cadastre-se
            </p>
          </div>
        </>
      </SignTemplate>
    </AnimatedPage>
  );
};

export default Login;
