import api from 'services/api';
import Swal from 'sweetalert2';

export const addPublication = async (
  title,
  description,
  images,
  idInstitution
) => {
  let result = true;
  const data = new FormData();
  data.append('title', title);
  data.append('description', description);
  data.append('idInstitution', idInstitution);
  images.forEach((img) => {
    data.append('file', img, img.name);
  });
  await api
    .post('/publication', data)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Pronto',
        text: 'Publicação feita com sucesso!',
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

export const getPublicationById = async (id) => {
  let result = null;
  await api
    .get(`/publication/${id}`)
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

export const updatePublication = async (title, description, id) => {
  let result = true;
  await api
    .put(`/publication/${id}`, { title, description })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Pronto',
        text: 'Publicação alterada com sucesso!',
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

export const deletePublication = async (id) => {
  let result = false;
  await api
    .delete(`/publication/${id}`)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Pronto',
        text: 'Publicação excluida com sucesso!',
      });
      result = true;
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

export const likePublication = async (id, idUser, like) => {
  let result = false;
  await api
    .put(`/publication/like/${id}`, {
      idUser,
      like,
    })
    .then(() => {
      result = true;
    });

  return result;
};
