import axios from 'axios'


export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: process.env.REACT_APP_URL
    })
  }


  postCharge = (stripeToken, price, name) => {
    return this.service.post('upload', { stripeToken, price, name }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

}