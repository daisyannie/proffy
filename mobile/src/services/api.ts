import axios from 'axios';

const api = axios.create({
    // Copiar a URL da tela do expo no navegador
    // Não pode ser localhost, tem q ser um IP acessível na rede
    baseURL: 'http://192.168.1.107:3333'
})

export default api;