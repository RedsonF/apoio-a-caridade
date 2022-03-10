import api from 'services/api';
import states from 'constants/states';

export const getStates = (all = true) => {
  const newStates = states.map(({ id, nome, sigla }) => ({
    value: id,
    label: nome,
    sigla,
  }));

  const stateDefault = {
    value: -1,
    label: 'Todas',
    sigla: '',
  };

  const finalStates = all ? [stateDefault, ...newStates] : newStates;

  return finalStates;
};

export const getStateByName = (state) => {
  let result = { value: -1, sigla: '', label: state };
  const s = getStates();

  const filter = s.filter((item) => item.label === state);

  if (filter.length > 0) [result] = filter;

  const { value, label, sigla } = result;
  return { value, label, sigla };
};

export const getCityByName = async (city, citys) => {
  let result = { value: -1, label: '' };

  const newCity = citys.filter((item) => item.label === city);

  if (newCity.length > 0) [result] = newCity;

  const { value, label } = result;

  return { value, label };
};

export const getCitys = async (stateId, all = true) => {
  const response = await api.get(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`
  );
  const { data } = response;

  const citys = data.map(({ id, nome }) => ({ value: id, label: nome }));

  const newCity = all ? { value: -1, label: 'Todas' } : '';

  const newCitys = all ? [{ value: -1, label: 'Todas' }, ...citys] : citys;

  return { newCitys, newCity };
};
