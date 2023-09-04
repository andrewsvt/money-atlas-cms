// @ts-nocheck
import simpleRestProvider from 'ra-data-simple-rest';
import config from './config';

import { fetchUtils } from 'react-admin';


const fetchJson = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }

    options.credentials = 'include';
    return fetchUtils.fetchJson(url, options);
}
  
export const dataProvider = simpleRestProvider(config.apiUrl, fetchJson);