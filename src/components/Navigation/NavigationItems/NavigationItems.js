import React from 'react';
import NavItem from './NavItem/NavItem';
import './NavigationItems.css';


const NavigationItems = (props) => (
    <ul className='NavigationItems'>
        <NavItem link= '/' exact>Burger Builder</NavItem>
        {props.isAuth ? <NavItem link= '/orders' >Orders</NavItem> : null}
        {props.isAuth ? <NavItem link= '/logout' >Log Out</NavItem>
        :<NavItem link= '/auth' >Log In</NavItem>}
        </ul>
);

export default NavigationItems;