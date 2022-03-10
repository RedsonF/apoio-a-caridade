import * as moment from 'moment';
import { cpf } from 'cpf-cnpj-validator';

export const validateGeneric = (value, invalidity) => {
  let msg = '';
  if (typeof value === 'string') {
    msg = !value.trim() ? invalidity : '';
  } else {
    msg = value <= 0 ? invalidity : '';
  }

  return msg;
};

export const validateDate = (date) => {
  const msg = moment(date, 'YYYY-MM-DD', true).isValid()
    ? ''
    : 'Informe uma data válida';
  return msg;
};

export const validateHour = (hour) => {
  const msg =
    moment(hour, 'HH:mm', true).isValid() && hour !== '24:00'
      ? ''
      : 'Informe uma hora válida';
  return msg;
};

export const validateCpf = (newCpf) => {
  const msg = cpf.isValid(newCpf) ? '' : 'Informe um cpf válido';
  return msg;
};

export const validateName = (name) => {
  const newName = name.replaceAll(' ', '');
  const re = /[^a-zà-ú]/gi;
  let response = '';

  if (re.test(newName)) response = 'O nome deve ter apenas letras';
  else if (name.length < 3) response = 'O nome deve ter pelo menos 3 letras';
  else if (name.length > 100) response = 'O nome deve ter no máximo 100 letras';

  return response;
};

export const validateEmail = (email) => {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return re.test(email) ? '' : 'Informe um email válido';
};

export const validatePassword = (password) => {
  let response = '';

  if (password.length < 6)
    response = 'Sua senha deve ter pelo menos 8 caracteres';
  else if (password.length > 20)
    response = 'Sua senha deve ter no máximo 20 caracteres';

  return response;
};

export const validatePhone = (phone) => {
  const re = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/;
  const re2 = /^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{7}$/;
  return re.test(phone) || re2.test(phone) ? '' : 'Informe um número válido';
};
