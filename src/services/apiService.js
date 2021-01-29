import Axios from 'axios'
import baseURL from './BaseURL'

export const callApi = async (url, method = 'GET', body, token) => {
    try {
        let res = await Axios({
            baseURL: baseURL.backEndURL,
            url: url,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                token: `${token}`,
            },
            method: method,
            timeout: 30000,
            data: body,
        })
        return res.data
    } catch (error) {
        throw error
    }
}

export const callApiImage = (url, method = 'GET', body, token) => {
    let formData = new FormData()
    Object.keys(body).forEach(key => {
        formData.append(key, body[key])
    })
    return new Promise((resolve, reject) => {
        Axios({
            baseURL: baseURL.backEndURL,
            url: url,
            headers: {
                'content-type': 'multipart/form-data',
                token: token,
            },
            method: method,
            timeout: 30000,
            data: formData,
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}
