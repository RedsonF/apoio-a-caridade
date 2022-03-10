import api from 'services/api';
import Swal from 'sweetalert2';

export const signup = async (email, password) => {
  let result = true;
  await api
    .post('/donor', {
      email,
      password,
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Pronto',
        text: 'Conta cadastrada com sucesso!',
      });
    })
    .catch((err) => {
      result = false;
      const { msg } = err.response?.data || '';
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: msg,
      });
    });
  return result;
};

export const updatePreferences = ({ state, city, typesOfInstitution }, id) => {
  api
    .put(`/donor/${id}`, {
      state,
      city,
      typesOfInstitution,
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Pronto',
        text: 'Alterações salvas com sucesso!',
      });
    })
    .catch((err) => {
      const { msg } = err.response?.data || '';
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: msg,
      });
    });
};

export const getDonor = async (id) => {
  let result = null;
  await api
    .get(`/donor/${id}`)
    .then((res) => {
      const { data } = res;
      result = data;
    })
    .catch((err) => {
      const { msg } = err.response?.data || '';
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro',
        text: msg,
      });
    });
  return result;
};
