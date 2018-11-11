import * as axios from 'axios';


export const orders = axios.default.create({
    baseURL: 'https://firestore-84244.firebaseio.com'
});