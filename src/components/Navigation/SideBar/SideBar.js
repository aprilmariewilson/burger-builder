import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems.js';
import './SideBar.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';

const SideBar = (props) => {
    let added = 'Close';
    if (props.open) {
        added = 'Open';
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={added}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}
export default SideBar;