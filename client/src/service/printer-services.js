import axios from 'axios'


export default class print {

    constructor() {

        this.service = axios.create({
            baseURL: process.env.REACT_APP_URL
        })
    }


    printer = (table_id, order, time, username, product, totalPrice) => {
        return this.service.post('printer', { table_id, order, time, username, product, totalPrice }, { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log(err));
    }



}