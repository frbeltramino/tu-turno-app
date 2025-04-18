import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';

dayjs.locale('es');
dayjs.extend(utc);

export function formatDate(dateString) {
  return dayjs.utc(dateString).format('D [de] MMMM [de] YYYY');
}


export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function splitDate(dateString, separator, part) {
  return dateString.split(separator,2)[part];
}