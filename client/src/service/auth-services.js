import axios from 'axios'

export default class services {

    constructor() {

        this.service = axios.create({
            baseURL: process.env.REACT_APP_URL,
            withCredentials: true
        })
    }

    signup = (username, password, role) => {
        return this.service.post('signup', { username, password, role })
            .then(response => response.data)
    }

    login = (username, password) => {
        return this.service.post('login', { username, password })
            .then(response => response.data)
    }

    logout = () => {
        return this.service.get('logout')
            .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('loggedin')
            .then(response => response.data)
    }
}