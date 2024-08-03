import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(req => {
    req.baseURL = '/backend';
    return req;
});

instance.interceptors.response.use(res => {
    return res.data;
});

export const get = < T = any > (url: string) => {
    return instance.get<T,T>(url);
}