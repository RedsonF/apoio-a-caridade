import React from 'react';
import CustomModal from 'components/CustomModal';
import Select from 'components/Select';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import { getCitys } from 'util/locations';

import styles from './styles.module.css';

const Modal = ({
  filterModal,
  changeFilterModal,
  data,
  setState,
  setCitys,
  setCity,
  setTypes,
  getInstitutions,
}) => {
  const { states, state, citys, city, types, isClearable } = data;

  const changeCity = (location) => {
    const value = location?.value ?? -1;
    const label = location?.label ?? 'Todas';

    setCity({ value, label });
  };

  const changeState = async (location) => {
    const value = location?.value ?? -1;
    const label = location?.label ?? 'Todos';

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

  return (
    <CustomModal
      open={filterModal}
      changeModal={() => changeFilterModal()}
      maxWidth="410px"
    >
      <div className={styles.container}>
        <p className={styles.title}>Filtros</p>
        <section className={styles.line} />
        <div className={styles.form}>
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
            checked={types[1].selected}
            value={types[1].selected}
            onChange={() => changeTypes(1)}
            label="Fundações"
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

          <Button
            onClick={() => getInstitutions()}
            style={{ marginTop: 20 }}
            small
          >
            FILTRAR
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};
export default Modal;
