import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: process.env.REACT_APP_URL
    })
  }


  // Files

  handleUpload = theFile => {
    return this.service.post('upload', theFile, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err));
  }



  // Restaurant

  postRestaurant = (restaurant, user) => {

    return this.service.post('newRestaurant', { restaurant, user }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }


  updateRestaurant = (restaurant) => {

    return this.service.post('updateRestaurant', restaurant, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }


  getRestaurant = (user_id, name_restaurant) => {

    return this.service.get(`getRestaurant/${user_id}/${name_restaurant}`, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log('Error', err))
  }



  // Menu

  postMenu = (menu, restaurant_id) => {

    return this.service.post('newPlate', { menu, restaurant_id }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  updateMenu = (menu) => {
    return this.service.post('updateMenu', { menu }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }

  deleteMenu = (menu) => {
    return this.service.post('deleteMenu', { menu }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }

  getMenu = (restaurant_id) => {
    return this.service.get(`getRestaurantMenu/${restaurant_id}`, { restaurant_id }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }



  // Order

  postOrder = (order) => {
    return this.service.post('newOrder', { order }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  updateOrder = (order, orderFiltered) => {
    return this.service.post('updateOrder', { order, orderFiltered }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err))
  }


  getOrder = () => {
    return this.service.get('getOrder', { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }

  clearOrder = (order_id) => {
    return this.service.post('clearOrder', { order_id }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }


  clearAllOrder = () => {
    return this.service.get('clearAllOrder', { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }


  updateCourse = (order) => {
    return this.service.post('updateCourse', { order }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }



  // User

  setRestaurant = (restaurant_id, table_id) => {
    console.log('en servicios')
    return this.service.post('setRestaurant', { restaurant_id, table_id }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }

  getCurrentRestaurant = () => {
    return this.service.get('getCurrentRestaurant', { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }

}