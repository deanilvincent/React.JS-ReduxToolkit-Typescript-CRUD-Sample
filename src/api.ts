import axios from 'axios';

let baseURL = "https://localhost:7128/api"

export default axios.create({
    baseURL
});