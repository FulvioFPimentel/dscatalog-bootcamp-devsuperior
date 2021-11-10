import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
    baseURL: 'https://fulvio-dscatalog.herokuapp.com'
})

export const TOKEN = 'Basic ZHNjYXRhbG9nOmRzY2F0YWxvZzEyMw=='


export async function userToken() {
    const token = await AsyncStorage.getItem("@token");
    return token;
}

//Backend requests

export function getProducts() {
    const res = api.get(`/products?direction=DESC&orderBy=id`)
    return res;
};

export async function createProduct(data: object) {
    const authToken = await userToken();
    const res = api.post('/products', data, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    return res;
}

export async function deleteProduct(id: number){
    const authToken = await userToken();
    const res = api.delete(`/products/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
}

export function getCategories () {
    const res = api.get(`/categories?direction=ASC&orderBy=name`);
    return res;
}