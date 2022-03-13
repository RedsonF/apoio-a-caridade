import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import AnimatedPage from 'animation/AnimatedPage';
import Header from 'components/Header';
import Form from 'components/Form';
import Input from 'components/Input';
import Button from 'components/Button';
import { updateInstitution, getInstitution } from 'services/institutionService';
import { validateGeneric } from 'util/validate';

import styles from './styles.module.css';

export default function SettingsBankData() {
  const { user } = useContext(AuthContext);
  const { _id: id } = user;
  const [pix, setPix] = useState('');
  const [bank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const [account, setAccount] = useState('');
  const [invaliditys, setInvaliditys] = useState({
    bank: '',
    branch: '',
    account: '',
    bankData: '',
  });

  const init = async (donationData) => {
    const { pix: newPix, bankData } = donationData;

    if (newPix) {
      setPix(newPix);
    }

    if (bankData) {
      const {
        bank: newBank,
        branch: newBranch,
        account: newAccount,
      } = bankData;

      if (newBank && newBranch && newAccount) {
        setBank(newBank);
        setBranch(newBranch);
        setAccount(newAccount);
      }
    }
  };

  useEffect(async () => {
    const { institution } = await getInstitution(id);
    init(institution.donationData);
  }, []);

  const changePix = (e) => {
    const { value } = e.target;
    setPix(value);
  };

  const changeBank = (e) => {
    const { value } = e.target;
    setBank(value);
  };

  const changeBranch = (e) => {
    const { value } = e.target;
    setBranch(value);
  };

  const changeAccount = (e) => {
    const { value } = e.target;
    setAccount(value);
  };

  const validate = () => {
    const newInvaliditys = {};

    if (bank || branch || account) {
      const bankInvalidity = validateGeneric(bank, 'Informe o banco!');
      newInvaliditys.bank = bankInvalidity;

      const branchInvalidity = validateGeneric(branch, 'Informe a agência!');
      newInvaliditys.branch = branchInvalidity;

      const accountInvalidity = validateGeneric(account, 'Informe a conta!');
      newInvaliditys.account = accountInvalidity;

      if (bankInvalidity || branchInvalidity || accountInvalidity) {
        newInvaliditys.bankData =
          'Informe todos os dados bancários ou deixe todos vazios!';
      }
    }

    setInvaliditys(newInvaliditys);

    const test = Object.values(newInvaliditys);
    const validated = !test.find((inv) => inv !== '');

    return validated;
  };

  const submit = () => {
    if (validate()) {
      const donationData = {
        pix,
        bankData: {
          bank,
          branch,
          account,
        },
      };

      updateInstitution({ donationData }, id);
    }
  };

  return (
    <AnimatedPage>
      <Header title="Configurações" path="/institution/settings" />
      <div className="content">
        <p className={styles.title}>Dados para doação</p>
        <div style={{ marginTop: 30 }} />
        <Form>
          <Input value={pix} onChange={changePix} label="Pix" />
        </Form>
        <div style={{ marginTop: 20 }} />
        <Form>
          <Input
            value={bank}
            onChange={changeBank}
            label="Banco"
            type="number"
            error={invaliditys.bank}
          />
          <Input
            value={branch}
            onChange={changeBranch}
            label="Agência"
            type="number"
            error={invaliditys.branch}
          />
          <Input
            value={account}
            onChange={changeAccount}
            label="Conta"
            type="number"
            error={invaliditys.account}
          />
          {invaliditys.bankData && (
            <p className={styles.error}>{invaliditys.bankData}</p>
          )}
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
