import React from 'react'
import { Tab, AppBar, Tabs, Typography } from "@material-ui/core";
import UserMenu from './user-menu'


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


    const { menu } = props

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

            {value === 0 && <TabContainer><UserMenu menu={menu} coursesType={'first_courses'} inOrder={props.inOrder} updateOrder={props.updateOrder} /> </TabContainer>}
            {value === 1 && <TabContainer><UserMenu menu={menu} coursesType={'second_courses'} inOrder={props.inOrder} updateOrder={props.updateOrder}/></TabContainer>}
            {value === 2 && <TabContainer><UserMenu menu={menu} coursesType={'drinks'} inOrder={props.inOrder} updateOrder={props.updateOrder}/></TabContainer>}
            {value === 3 && <TabContainer><UserMenu menu={menu} coursesType={'desserts'} inOrder={props.inOrder} updateOrder={props.updateOrder}/></TabContainer>}
        </div>
    )
}
