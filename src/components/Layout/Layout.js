import React from 'react';
import Aux from '../../hoc/Auxilary';
import './Layout.css';

const Layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, BackDrop</div>
        <main className='Content'>
            {props.children}
        </main>
    </Aux>
);
export default Layout;