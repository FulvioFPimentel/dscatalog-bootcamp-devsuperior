import axios, { Method } from 'axios';
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRET, getSessionData, logout } from './auth';

type RequestParams = {
    method?: Method;
    url: string;
    data?: object | string;
    params?: object;
    headers?: object;
}

type LoginData = {
    username: string;
    password: string;
}

const BASE_URL = "http://localhost:8080";

// Interceptar uma requisição, caso 401, redirecionar para a tela de login
axios.interceptors.response.use(function (response) {

    return response;
  }, function (error) {
      if (error.response.status === 401) {
        logout();
      }
    return Promise.reject(error);
  });

// Requisição ao back-end //
 export const makeRequest = ({ method = 'GET', url, data, params, headers }: RequestParams) => {
    return axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        params,
        headers
    });
}

// Pegar o token do usuário logado para todas as requisições //
export const makePrivateRequest = ({ method = 'GET', url, data, params }: RequestParams) => {
    const sessionData = getSessionData();

    const headers = {
        'Authorization': `Bearer ${sessionData.access_token}`
    }
    return makeRequest({method, url, data, params, headers});
}

// Requisição para login de usuario, retornando um token valido //
export const makeLogin = (loginData: LoginData) => {
    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const headers = {
        Authorization: `Basic ${window.btoa(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }

const payload = qs.stringify({ ...loginData, grant_type: 'password' })

return makeRequest({ url: '/oauth/token', data: payload, method: 'POST', headers })

}