import axios from 'axios';

 const instance = axios.create({
    baseURL: 'https://my-burger-f08f7.firebaseio.com/'
});

export default instance;