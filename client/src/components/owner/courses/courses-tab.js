import React from 'react'
import { Tab, AppBar, Tabs, Typography } from "@material-ui/core";
import CoursesMenu from '../menus/menu-courses'


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    )
}

export default function SimpleTabs(props) {
    const [value, setValue] = React.useState(0);

    function handleChangeTab(event, newValue) {
        setValue(newValue);
    }

    const { restaurant } = props

    return (
        <div >
            <AppBar position="static" >
                <Tabs value={value} onChange={handleChangeTab}>
                    <Tab label="Entrante" />
                    <Tab label="Segundo" />
                    <Tab label="Bebidas" />
                    <Tab label="Postres" />
                </Tabs>
            </AppBar>

            {value === 0 && <TabContainer><CoursesMenu restaurant={restaurant} coursesType={'first_courses'} setTheUser={props.setTheUser} /></TabContainer>}
            {value === 1 && <TabContainer><CoursesMenu restaurant={restaurant} coursesType={'second_courses'} setTheUser={props.setTheUser} /></TabContainer>}
            {value === 2 && <TabContainer><CoursesMenu restaurant={restaurant} coursesType={'drinks'} setTheUser={props.setTheUser} /></TabContainer>}
            {value === 3 && <TabContainer><CoursesMenu restaurant={restaurant} coursesType={'desserts'} setTheUser={props.setTheUser} /></TabContainer>}
        </div>
    )
}
