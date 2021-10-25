import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRET, getSessionData, logout } from './auth';

type LoginData = {
    username: string;
    password: string;
}

const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

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
 export const makeRequest = (params: AxiosRequestConfig ) => {
    return axios({
        ...params,
        baseURL: BASE_URL
    });
}

// Pegar o token do usuário logado para todas as requisições //
export const makePrivateRequest = (params: AxiosRequestConfig ) => {
    const sessionData = getSessionData();

    const headers = {
        'Authorization': `Bearer ${sessionData.access_token}`
    }
    return makeRequest({ ...params, headers});
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