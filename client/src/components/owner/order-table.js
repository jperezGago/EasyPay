import React, { Component } from 'react'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import Button from '@material-ui/core/Button'
import Product from '../owner/cards/card-order'
import OwnerServices from '../../service/owner-services'
import { socketConfig } from "../socket-config/socket"


class OrderTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tables: this.props.loggedInUser.restaurant.tables,
      order: [],
      totalAmount: 0,

      show: false
    }
    this.services = new OwnerServices()

    this.connectSocket = new socketConfig(this.socketMsg, { id: props.match.params.restaurant_id, num: props.match.params.table_id })
    this.connectSocket.socket.on('subasta!', data => {
      this.setState({ order: data.message })
    })
  }


  handleOrder = () => {

    this.services.updateOrder(this.state.order)
      .then(orderUpdated => {
        let orderFiltered = orderUpdated.filter(course => course.quantity !== 0)
        this.setState({ order: orderFiltered })
      })
  }


  updateOrder = (courseUpdated, idx) => {

    let orderCopy = [...this.state.order]
    orderCopy[idx] = courseUpdated
    this.setState({ order: orderCopy })

  }

  totalPrice() {
    return this.state.order.reduce((acc, course) => acc + (course.price * course.quantity), 0)
  }

  socketNewMessage = (e) => {

    this.connectSocket.newMessage(this.state.order,
      { id: this.props.match.params.restaurant_id, num: this.props.match.params.table_id })
  }


  render() {
    const { order } = this.state

    return (
      <div>
        <div>
          <TopNav user={this.props} />

          <section className="content-home">

            <header className="hero-order">
              <h1>Order in tables 1</h1>
            </header>

            <section className="container">
              <h2>Order Details</h2>

              {
                order.map((course, idx) => {
                  return <Product key={idx} index={idx} course={course} updateOrder={this.updateOrder} />
                })
              }

            </section>

            <section className='footer-bag'>
              <h1>Total: ${this.totalPrice()}</h1>
              <Button onClick={this.socketNewMessage} variant="contained" className='btn-order'>Guardar</Button>
            </section>

          </section>

          <BottomNav user={this.props.loggedInUser} />
        </div>
      </div>

    )
  }
}

export default OrderTable