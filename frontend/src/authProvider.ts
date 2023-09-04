import { AuthProvider, HttpError } from 'react-admin';
import data from './users.json';
import config from './config';

/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
export const authProvider: AuthProvider = {
    login: ({ username, password }) => {
        const request = new Request(`${config.apiUrl}/admins/authenticate`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'include',
        });
        return fetch(request)
          .then(response => {
              if (response.status < 200 || response.status >= 300) {
                  throw new Error(response.statusText);
              }
              localStorage.setItem('auth', JSON.stringify({ auth: true }));
          })
          .catch(() => {
              throw new Error('Network error')
          });
      },
    
      checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject({ redirectTo: '/login' });
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
      logout: () => {
        const request = new Request(`${config.apiUrl}/admins/logout`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'include',
        });
        return fetch(request)
            .then(response => {
              localStorage.removeItem('auth');
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
            });
      },
      checkAuth: () => {
        return localStorage.getItem('auth')
          ? Promise.resolve()
          : Promise.reject({ redirectTo: '/login' });
      },
      getPermissions: params => Promise.resolve(),
};

export default authProvider;
