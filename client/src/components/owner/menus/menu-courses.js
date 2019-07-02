import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CoursesCard from '../cards/card-courses'
const Finished = styled.div`
    padding: 6px 16px;
    font-size: 0.875rem;
    min-width: 64px;
    box-sizing: border-box;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    color: #fff;
    background-color: #000000;
    margin-top: 20px;
    width: 40%;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);
    text-align:center;
    margin: 20px 0;
`;

class CoursesMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            redirect: false,
        }
    }


    render() {
        const { restaurant } = this.props

        const menu = this.props.restaurant.menu
        const coursesType = this.props.coursesType

        const filteredMenu = menu.filter(course => course.type === coursesType)


        if (filteredMenu.length) {
            return (
                <div>
                    <section>
                        {filteredMenu.map((course, idx) => <CoursesCard key={idx} course={course} restaurant={restaurant} setTheUser={this.props.setTheUser} />)}
                    </section>
                    <div className="btn-bottom">
                        <Finished>
                            <Link to="/owner/home">Finalizar</Link>
                        </Finished>
                    </div>
                </div>
            )

        } else {
            return (
                <p>No existen platos</p>
            )
        }
    }
}


export default CoursesMenu