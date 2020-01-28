import Axios from "axios";
const baseURL = `http://localhost:3001/notes`;

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
};

const create = newObject => {
    const request = Axios.put(baseURL, newObject);
    return request.then(response => response.data);
};

const update = (id, newObject) => {
    const request = Axios.put(`${baseURL}/${id}`, newObject);
    return request.then(response => response.data);
};

export default {
    getAll,
    create,
    update
};