import axios from 'axios';

const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

let baseURL = "https://localhost:7128/api"
if (!development)
    baseURL = "https://basicemployeedirectorywebapi.azurewebsites.net/api"


export default axios.create({
    baseURL
});