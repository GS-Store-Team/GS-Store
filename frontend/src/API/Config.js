import axios from "axios";

export const httpHeaders= {
    'Content-Type': 'application/json',
    "responseType": "arraybuffer",
    "Authorization": "",
}

window.addEventListener('storage', function (){
    httpHeaders.Authorization = `Bearer_${sessionStorage.getItem('token')}`
});

export const restClient = axios.create()

restClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log(error)
        if(error.response.status === 403){
            window.dispatchEvent(new Event('logout'))
        }
        if(error.response.status === 500){
            window.dispatchEvent(new Event('error'))
        }
        return error
    }
);