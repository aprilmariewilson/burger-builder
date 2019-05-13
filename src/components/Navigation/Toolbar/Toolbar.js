import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from './Menu/Menu';

const Toolbar = (props) => (
    <header className='Toolbar'>
        <Menu click={props.open}/>
        <Logo height='80%'/>
        <nav className="Desktop">
           <NavigationItems/>
    </nav>
    </header>
);

export default Toolbar;