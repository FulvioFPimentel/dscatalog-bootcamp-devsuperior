import axios from 'axios';
import { Platform } from 'react-native';   // verificar qual é o sistema operacional
import mime from 'mime';                    // identificar qual o tipo da imagem
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

export async function getProduct(id: number){
    const res = await api.get(`/products/${id}`);
    return res;
}

export async function updateProduct(data: object){
    const authToken = await userToken();
    const res = await api.put(`/products/${data.id}`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return res;
}

export function getCategories () {
    const res = api.get(`/categories?direction=ASC&orderBy=name`);
    return res;
}

// image Upload
export async function uploadImage(image: string) {
    if(!image) return;

    const authToken = await userToken();
    let data = new FormData();

    if(Platform.OS === "android") {
        const newImageUri = "file:///" + image.split("file:/").join("");

        data.append("file", {
            uri: newImageUri,
            type: mime.getType(image),
            name: newImageUri,
        });
    } else if (Platform.OS === "ios") {

        data.append('file', {
            uri: image,
            name: image,
        });
    }
    
    const res = await api.post(`/products/image`, data, {
        headers: {Authorization: `Bearer ${authToken}`, "Content-Type" : "multipar/form-data"},
    });
    return res;
}
