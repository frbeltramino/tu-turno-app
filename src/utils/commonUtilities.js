import dayjs, { locale } from "dayjs";
import "dayjs/locale/es";
import "dayjs/locale/en";
import utc from "dayjs/plugin/utc";
import i18n from "i18next"; 

dayjs.extend(utc);


export function formatDate(dateString) {
  const lang = i18n.language;

  const day = dayjs.utc(dateString).locale(lang).format("dddd"); // devuelve "Lunes", "Monday", etc.

  const format = lang === "es" 
  ? "dddd D [de] MMMM [de] YYYY"  
  : "dddd, MMMM D, YYYY";  
  const formattedDate = dayjs.utc(dateString).locale(lang).format(format);

  return `${formattedDate}`; 
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function splitDate(dateString, separator, part) {
  return dateString.split(separator, 2)[part];
}

export function getDayInEnglish(dateString) {
  return dayjs.utc(dateString).locale("en").format("dddd"); 
}

export function getI18nMonth(dateString) {
  const lang = i18n.language;
  return dayjs.utc(dateString).locale(lang).format("MMMM");
}

export function getI18nDay(dateString) {
  const lang = i18n.language;
  return dayjs.utc(dateString).locale(lang).format("dddd");
}