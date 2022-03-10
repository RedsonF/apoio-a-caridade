import api from 'services/api';
import Swal from 'sweetalert2';

export const signup = async (
  name,
  email,
  password,
  state,
  city,
  address,
  type,
  cnpj
) => {
  let result = true;
  await api
    .post('/institution', {
      name,
      email,
      password,
      type,
      cnpj,
      location: {
        state,
        city,
        address,
      },
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

export const getInstitution = async (id) => {
  let result = null;
  await api
    .get(`/institution/${id}`)
    .then((res) => {
      const { data } = res;
      result = data;
    })
    .catch((err) => {
      const { msg } = err.response?.data || '';
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: msg,
      });
    });
  return result;
};

export const updateInstitution = (body, id) => {
  api
    .put(`/institution/${id}`, body)
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

export const imageInstitution = (image, id, cover = true) => {
  const data = new FormData();
  data.append('file', image, image.name);
  const type = cover ? 'image' : 'logo';
  api
    .post(`/institution/${type}/${id}`, data)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Pronto',
        text: 'Imagem alterada com sucesso!',
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
