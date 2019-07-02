import React, { Component } from 'react'
import TopNav from '../top-nav'
import BottomNav from '../bottom-nav'
import TableCard from './cards/card-tables'

class Tableslist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      restaurant: this.props.loggedInUser.restaurant,
      tables: this.props.loggedInUser.restaurant.tables,
    }
  }


  render() {
    const restaurant = this.props.loggedInUser.restaurant
    const tables = this.props.loggedInUser.restaurant.tables

    return (

      <div>
        <TopNav user={this.props} />

        <section className="content-home">
          <header className="hero-tables">
            <h1>Your Tables</h1>
          </header>
          <section className="container">

            <h2>Choose the table</h2>

            {tables.map((table, idx) => <TableCard key={idx} table_id={table.table_id} restaurant_id={restaurant._id} />)}

          </section>


        </section>

        <BottomNav user={this.props.loggedInUser} />
      </div>
    )
  }
}


export default Tableslist

