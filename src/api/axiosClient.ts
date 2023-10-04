import axios from 'axios';
import Config from 'react-native-config';

console.log('Config.API_URL', Config.API_URL);
export const client = axios.create({
  baseURL: Config.API_URL,
});
