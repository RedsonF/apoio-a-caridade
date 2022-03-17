import { cpf, cnpj } from 'cpf-cnpj-validator';
import states from 'constants/states';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export const relativeTime = (date) => {
  if (date) {
    return moment(date).fromNow();
  }
  return date;
};

export const convertDate = (date) => {
  if (date) {
    const d = date.substring(0, 10).split('-');
    return `${d[2]}/${d[1]}/${d[0]}`;
  }
  return date;
};

export const convertHour = (hour) => {
  if (hour) {
    return hour.replace(':', 'h');
  }
  return hour;
};

export const convertToSigla = (state) => {
  let result = { sigla: state };

  const filter = states.find((item) => item.nome === state);

  if (filter) result = filter;
  return result.sigla;
};

export const maskCpf = (newCpf) => cpf.format(newCpf);

export const stripCpf = (newCpf) => cpf.strip(newCpf);

export const stripCnpj = (newCnpj) => cnpj.strip(newCnpj);

export const maskPhone = (phone) => {
  if (phone) {
    const n = phone.split('');
    return `(${n[0]}${n[1]}) ${n[2]}${n[3]}${n[4]}${n[5]}${n[6]}-${n[7]}${n[8]}${n[9]}${n[10]}`;
  }
  return phone;
};

export const stripPhone = (phone) =>
  phone
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replaceAll('-', '')
    .replaceAll(' ', '');
