import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from 'services/api';
import Swal from 'sweetalert2';

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('apoioToken');
    const newRole = Cookies.get('apoioRole');
    const nUser = Cookies.get('apoioUser');
    const newUser = nUser ? JSON.parse(nUser) : null;

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setRole(newRole);
      setUser(newUser);
    }

    setLoading(false);
  }, [role]);

  const login = (email, password) => {
    api
      .post('/auth/login', {
        email,
        password,
      })
      .then((res) => {
        const { token, user: newUser } = res.data;

        Cookies.set('apoioToken', token);
        Cookies.set('apoioRole', newUser.role);
        Cookies.set('apoioUser', JSON.stringify(newUser));

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(newUser);
        setRole(newUser.role);
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

  const logout = () => {
    api
      .put('/auth/logout', {
        id: user?._id,
      })
      .then(() => {
        Cookies.remove('apoioToken');
        Cookies.remove('apoioRole');
        Cookies.remove('apoioUser');
        api.defaults.headers.Authorization = undefined;
        setRole('');
        setUser(null);
      })
      .catch((err) => {
        const { msg } = err.response?.data || '';
        Swal.fire({
          icon: 'error',
          title: 'Ocorreu um erro',
          text: msg,
        });
      });
  };

  return {
    loading,
    login,
    logout,
    role,
    user,
  };
}
