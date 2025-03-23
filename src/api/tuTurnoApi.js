import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";


const { VITE_API_URL } = getEnvVariables();

const tuTurnoApi = axios.create({
  baseURL: VITE_API_URL
});


//TODO: CONFIGURAR INTERCEPTORES

export default tuTurnoApi;