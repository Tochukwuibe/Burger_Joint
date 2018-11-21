import * as axios from 'axios';


export const orders = axios.default.create({
    baseURL: 'https://firestore-84244.firebaseio.com'
});



export const auth = axios.default.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty',
    params: {key: 'AIzaSyA798mO_IqbKHGY8xMtBpuuiADvM1dkvr4'}
})