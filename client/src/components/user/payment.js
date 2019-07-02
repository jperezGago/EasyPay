import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements';
import PayServices from '../../service/payment-services'
import { Redirect } from 'react-router-dom'
import OwnerServices from '../../service/owner-services'


class Payment extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit;

    this.state = {
      productInfo: {
        uuid: 1,
        productName: 'menu',
        productDescription: 'purchase',
        productPrice: 10.99,

        cardName: 'Pepe',
        cardNumber: 4242424242424242,
      },
      redirect: false
    }
    this.services = new PayServices()
    this.services = new OwnerServices()

  }



  submit = async (ev) => {
    ev.preventDefault()

    let { token } = await this.props.stripe.createToken({ name: this.props.name, amount: 8000 });
    let response = await fetch(process.env.REACT_APP_URL + 'charge', {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: `${token.id} ${this.props.total}`,
    });

    if (response.ok) {
      this.setState({
        redirect: true
      })
    }
  }


  handleChange = e => {

    const { name, value } = e.target
    this.setState({
      productInfo: {
        ...this.state.productInfo,
        [name]: value
      }
    })
  }


  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    if (this.state.redirect) {
      return <Redirect to={'paymentSucess'} />

    } else {
      return (
        <div className="checkout" id="checkout">
          <p>Pago seguro y rápido</p>
          <CardElement />
          <button onClick={this.submit}>Pagar</button>
        </div>
      )
    }
  }
}

export default injectStripe(Payment)